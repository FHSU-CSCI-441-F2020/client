import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { UserProfile } from '../models/userprofile';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginComponent } from '../components/modules/login/login.component';
// import { AuthService } from './auth.service';

/**
 * Mutation for registering user
 */
const createProfile = gql`
  mutation createProfile(
    $userId: String!
    $statement: String!
    $education: [JSON]!
    $workExperience: [JSON]!
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
/**
 * Mutation to update a user
 */
const updateUser = gql`
  mutation updateUser($id: ID!, $completedProfile: Boolean) {
    updateUser(id: $id, completedProfile: $completedProfile) {
      completedProfile
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

/**
 * Query for getting current user profile
 */
const getProfile = gql`
  query getProfile($id: ID!) {
    getProfile(id: $id) {
      userProfile {
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
      user {
        firstName
        lastName
        phoneNumber
        email
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: BehaviorSubject<User>;
  private userDetails: User;
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

  private profile: BehaviorSubject<any>;
  constructor(private apollo: Apollo, private router: Router) {
    // Init Observables
    this.userProfile = new BehaviorSubject<UserProfile>(this.defaultProfile);
    this.user = new BehaviorSubject<User>(this.defaultUser);
    this.profile = new BehaviorSubject<any>(null);

    console.log('User service started');
  }
  /**
   * Set both private user and observable user
   */
  setUser(user: User): void {
    this.userDetails = { ...user };
    this.user.next({ ...user });
    if (user.completedProfile) {
      this.setUserProfile();
      console.log('User profile started');
    }
  }

  /**
   * Returns the current user data as observable
   */
  getUser(): Observable<User> {
    return this.user.asObservable();
  }

  /**
   * Clears both private user and observable user
   */
  clearUser(): void {
    this.user.next({ ...this.defaultUser });
    this.userDetails = { ...this.defaultUser };
  }

  setUserProfile(): void {
    this.apollo
      .watchQuery<any>({
        query: getUserProfile,
        variables: {
          userId: this.userDetails.id,
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.userProfile.next(data.getUserProfile);
        console.log(data);
      });
  }
  /**
   * Query and return user profile data as observable
   */
  getUserProfile(): Observable<UserProfile> {
    return this.userProfile.asObservable();
  }

  /**
   * Create a user profile and set user to completed profile
   *
   * @param profile User profile data to create profile
   */
  submitProfile(profile: UserProfile): void {
    // Set loading to true
    // this.authService.loading.next(true);
    // Start mutation query
    profile.userId = this.user.value.id;

    this.apollo
      .mutate<any>({
        mutation: createProfile,
        variables: {
          ...profile,
        },
      })
      .subscribe(
        ({ data }) => {
          console.log('Updated user complete', data);
          this.userProfile.next({ ...data.createProfile });
          this.userProfile.subscribe((data) => console.log(data));

          // Add data to user using deconstructor
          // this.userProfile = { ...data['createdProfile'] };
          // Return to profile
          this.router.navigate(['/profile']);
        },
        (error) => {
          // Stop loading
          // this.authService.loading.next(true);
          console.log('there was an error sending the query', error);
        }
      );
    // this.apollo
    //   .mutate({
    //     mutation: updateUser,
    //     variables: {
    //       id: this.userDetails.id,
    //       completedProfile: true,
    //     },
    //   })
    //   .subscribe(
    //     ({ data }) => {
    //       // Add data to user using deconstructor
    //       // this.userProfile = { ...data['createdProfile'] };
    //       // Return to profile
    //       // this.router.navigate(['/profile']);
    //       console.log(data);
    //     },
    //     (error) => {
    //       // Stop loading
    //       // this.authService.loading.next(true);
    //       console.log('there was an error sending the query', error);
    //     }
    //   );
  }

  /**
   * Query and return user profile data as observable
   */
  getProfile(): Observable<any> {
    return this.profile.asObservable();
  }

  /**
   * Create a user profile and set user to completed profile
   *
   * @param profile User profile data to create profile
   */
  queryProfile(userId: any): void {
    // Set loading to true
    // this.authService.loading.next(true);
    // Start mutation query
    const id = userId.toInt;
    this.apollo
      .mutate<any>({
        mutation: getProfile,
        variables: {
          id: userId,
        },
      })
      .subscribe(
        ({ data }) => {
          if (data) {
            this.profile.next({ ...data });
          }
        },
        (error) => {
          // Stop loading
          // this.authService.loading.next(true);
          console.log('there was an error sending the query', error);
        }
      );
  }
}
