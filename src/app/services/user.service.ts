import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { UserProfile } from '../models/UserProfile';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { AuthService } from './auth.service';

/**
 * Mutation for registering user
 */
const createProfile = gql`
  mutation createProfile(
    $userId: String!
    $statement: String!
    $education: [String]!
    $workExperience: [String]!
    $lookingFor: [String]!
    $skills: [String]!
    $active: Boolean!
    $address1: String
    $address2: String
    $city: String!
    $state: String!
    $zip: Int!
    $country: String!
  ) {
    createProfile(
      userId: $userId
      statement: $statement
      education: $education
      workExperience: $workExperience
      lookingFor: $lookingFor
      skills: $skills
      active: $active
      address1: $address1
      address2: $address2
      city: $city
      state: $state
      zip: $zip
      country: $country
    ) {
      id
    }
  }
`;
/**
 * Query for getting current user profile
 */
const getUserProfile = gql`
  query getUserProfile($userId: String!) {
    getUserProfile(userId: $userId) {
      statement
      education
      workExperience
      lookingFor
      skills
      active
      address1
      address2
      city
      state
      zip
      country
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: BehaviorSubject<User>;
  private defaultUser: User = {
    id: '1',
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    role: '',
    completedProfile: false,
  };
  // private user: User = {
  //   id: '1',
  //   username: '',
  //   email: '',
  //   password: '',
  //   firstName: '',
  //   lastName: '',
  //   phoneNumber: '',
  //   role: '',
  //   completedProfile: false,
  // };

  private userProfile: BehaviorSubject<UserProfile>;
  private defaultProfile: UserProfile = {
    userId: '',
    statement: '',
    education: [],
    workExperience: [],
    lookingFor: [],
    skills: [],
    active: false,
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: 0,
    country: '',
  };
  constructor(
    private apollo: Apollo,
    private router: Router // private authService: AuthService
  ) {
    this.userProfile = new BehaviorSubject<UserProfile>(this.defaultProfile);
    this.user = new BehaviorSubject<User>(this.defaultUser);
  }

  setUser(user: User): void {
    this.user.next({ ...user });
  }

  getUser(): Observable<User> {
    return this.user.asObservable();
  }

  clearUser(): void {
    this.user = null;
  }

  getUserProfile(): Observable<UserProfile> {
    this.apollo
      .watchQuery<any>({
        query: getUserProfile,
        variables: {
          userId: '2',
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.userProfile.next(data.getUserProfile);
      });
    return this.userProfile.asObservable();
  }

  submitProfile(profile: UserProfile): void {
    // Set loading to true
    // this.authService.loading.next(true);
    // Start mutation query
    profile.userId = this.user.value.id;
    this.apollo
      .mutate({
        mutation: createProfile,
        variables: {
          ...profile,
        },
      })
      .subscribe(
        ({ data }) => {
          // Add data to user using deconstructor
          this.userProfile = { ...data['createdProfile'] };
          // Return to profile
          this.router.navigate(['/profile']);
        },
        (error) => {
          // Stop loading
          // this.authService.loading.next(true);
          console.log('there was an error sending the query', error);
        }
      );
  }
}
