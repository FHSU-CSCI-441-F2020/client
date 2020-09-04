import { Injectable } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

const getMe = gql`
  {
    me {
      id
    }
  }
`;
const registerUser = gql`
  mutation registerUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $password: String!
    $email: String!
    $role: String!
  ) {
    registerUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
      role: $role
    ) {
      user {
        id
      }
      token
    }
  }
`;

const loginUser = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(login: $username, password: $password) {
      token
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userAuthenticated: Observable<boolean> = of(false);

  constructor(public apollo: Apollo) {
    this.userAuthenticated = this.apollo
      .watchQuery({ query: getMe })
      .valueChanges.pipe(
        map(({ data }) => {
          if (data === null || data['me'] === null) {
            return false;
          } else {
            return data['me']['id'] > 0 ? true : false;
          }
        })
      );
  }

  public isAuthenticated(): Observable<boolean> {
    return this.userAuthenticated;
  }

  public loginUser(username: string, password: string): any {
    this.apollo
      .mutate({
        mutation: loginUser,
        variables: {
          username: username,
          password: password,
        },
      })
      .subscribe(
        ({ data }) => {
          const token = data['loginUser']['token'];
          localStorage.setItem('jobkikToken', token);
          this.userAuthenticated = of(true);
          return data;
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  public registerUser(user: User): any {
    this.apollo
      .mutate({
        mutation: registerUser,
        variables: {
          username: user.username,
          password: user.password,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      })
      .subscribe(
        ({ data }) => {
          const token = data['registerUser']['token'];
          localStorage.setItem('jobkikToken', token);
          this.userAuthenticated = of(true);
          return data;
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  public logout(): void {
    this.userAuthenticated = of(false);
    localStorage.setItem('jobkikToken', null);
  }
}
