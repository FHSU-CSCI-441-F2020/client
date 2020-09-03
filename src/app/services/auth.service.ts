import { Injectable } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { of as observableOf, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Result } from '../models/Result';

import { map } from 'rxjs/operators';

const CurrentUserForProfile = gql`
  {
    getUsers {
      username
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loading: boolean;

  data: Observable<any>;
  token: Observable<any>;
  currentUser: any;
  private profileObs$: BehaviorSubject<Result> = new BehaviorSubject(null);
  private result: BehaviorSubject<Result> = new BehaviorSubject(null);
  // private token: BehaviorSubject<string> = new BehaviorSubject(null);
  public usersChanged = this.result.asObservable();
  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {
    console.log('Services started');
    // this.querySubscription = this.apollo
    //   .watchQuery<any>({
    //     query: CurrentUserForProfile,
    //   })
    //   .valueChanges.subscribe(({ data, loading }) => {
    //     this.loading = loading;
    //     this.result = data['getUsers'][0]['username'];
    //     console.log(data['getUsers'][0]['username']);
    //   });

    this.data = this.apollo
      .watchQuery({ query: CurrentUserForProfile })
      .valueChanges.pipe(map(({ data }) => data['getUsers'][0]['username']));

    // this.getUser();
  }

  getUser(): any {
    // getUser(): Observable<Result> {
    // return this.result.asObservable();
    this.apollo
      .mutate({
        mutation: register,
        // variables: {
        //   repoFullName: 'apollographql/apollo-client'
        // }
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data['registerUser']['token']);
          return data;
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  getToken(): Observable<string> {
    return this.token;
  }

  getResults(): Observable<Result> {
    return this.data;
  }

  showUser() {
    console.log(this.currentUser);
  }
}
