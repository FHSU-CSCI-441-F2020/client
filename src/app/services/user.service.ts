import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User;

  constructor() {}

  setUser(user: User): void {
    this.user = { ...user };
  }

  getUser(): User {
    return this.user;
  }

  clearUser(): void {
    this.user = null;
  }
}
