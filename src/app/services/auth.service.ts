import { Injectable } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

const getMe = gql`
  {
    me {
      id
    }
  }
`;
const register = gql`
  mutation {
    registerUser(
      firstName: "Bob"
      lastName: "Parsons"
      username: "bparsodfndfsfewtds33"
      email: "deadstylesdfdfbp@gwtdfmail.com"
      password: "hatereact"
      role: "user"
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
  public userAuthenticated: Observable<any>;
  private token: string;
  data: Observable<any>;
  public stringVar = new BehaviorSubject<string>(null);
  me: any;
  public stringVar$ = this.stringVar.asObservable();
  // loading: boolean;

  // data: Observable<any>;
  // token: Observable<any>;
  // currentUser: any;
  // private profileObs$: BehaviorSubject<Result> = new BehaviorSubject(null);
  public result: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // // private token: BehaviorSubject<string> = new BehaviorSubject(null);
  // public usersChanged = this.result.asObservable();
  private querySubscription: any;

  constructor(public apollo: Apollo) {
    console.log('Services started');

    //Without subscription
    // this.querySubscription = this.apollo
    //   .watchQuery<any>({
    //     query: CurrentUserForProfile,
    //   })
    //   .valueChanges.subscribe(({ data, loading }) => {
    //     this.loading = loading;
    //     this.result = data['getUsers'][0]['username'];
    //     console.log(data['getUsers'][0]['username']);
    //   });

    // WIth subscription

    // this.data = this.apollo
    //   .watchQuery({ query: CurrentUserForProfile })
    //   .valueChanges.pipe(map(({ data }) => data['getUsers'][0]['username']));
    this.data = this.apollo
      .watchQuery({ query: getMe })
      .valueChanges.pipe(map(({ data }) => data));
  }

  public isAuthenticated(): Observable<any> {
    return this.data;
  }

  public loginUser(username: string, password: string): any {
    // this.userAuthenticated = true;
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
          console.log('got data', data);
          this.token = data['loginUser']['token'];
          localStorage.setItem('token', this.token);
          // this.userId = data['loginUser']['id'];
          // console.log(this.userId);
          console.log(localStorage.getItem('token'));

          return data;
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  getMe(): any {
    console.log('Get me started');

    // this.querySubscription = this.apollo
    //   .watchQuery<any>({
    //     query: getMe,
    //   })
    //   .valueChanges.subscribe(({ data, loading }) => {
    //     console.log(data);
    //     this.result = data.me.id;
    //     return this.result;
    //   });
  }

  getUser(): any {
    // getUser(): Observable<Result> {
    // return this.result.asObservable();
    // this.apollo
    //   .mutate({
    //     mutation: register,
    //     // variables: {
    //     //   repoFullName: 'apollographql/apollo-client'
    //     // }
    //   })
    //   .subscribe(
    //     ({ data }) => {
    //       console.log('got data', data['registerUser']['token']);
    //       return data;
    //     },
    //     (error) => {
    //       console.log('there was an error sending the query', error);
    //     }
    //   );
  }

  // getToken(): Observable<string> {
  //   return this.token;
  // }

  // getResults(): Observable<Result> {
  //   return this.data;
  // }

  // showUser() {
  //   console.log(this.currentUser);
  // }
}
