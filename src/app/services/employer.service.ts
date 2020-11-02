import { Injectable } from '@angular/core';
import { Employer } from '../models/employer';
import { User } from '../models/user';
import { Job } from '../models/job';
import { UserService } from './user.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
/**
 * Mutation for registering user
 */
const createJob = gql`
  mutation createJob(
    $name: String!
    $description: String!
    $requirements: String!
    $hours: String!
    $city: String!
    $state: String!
    $zip: Int!
    $country: String!
  ) {
    createJob(
      name: $name
      description: $description
      requirements: $requirements
      hours: $hours
      city: $city
      state: $state
      zip: $zip
      country: $country
    )
  }
`;

/**
 * Mutation for registering user
 */
const registerEmployer = gql`
  mutation registerEmployer(
    $name: String!
    $email: String!
    $phoneNumber: String!
    $address1: String
    $address2: String
    $city: String!
    $state: String!
    $zip: Int!
    $country: String!
  ) {
    registerEmployer(
      name: $name
      email: $email
      phoneNumber: $phoneNumber
      address1: $address1
      address2: $address2
      city: $city
      state: $state
      zip: $zip
      country: $country
    )
  }
`;

/**
 * Query for getting single job
 */
const getEmployer = gql`
  query getEmployer($id: ID!) {
    getEmployer(id: $id) {
      id
      name
      teamMembers
      jobs
      email
      phoneNumber
      owner
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
export class EmployerService {
  private employer: BehaviorSubject<Employer>;

  constructor(
    private apollo: Apollo,
    private userService: UserService,
    private router: Router
  ) {
    this.employer = new BehaviorSubject<Employer>(null);
    this.userService
      .getUser()
      .pipe(first())
      .subscribe((user) => {
        this.apollo
          .watchQuery<any>({
            query: getEmployer,
            variables: {
              id: user.id,
            },
          })
          .valueChanges.subscribe(({ data, loading }) => {
            console.log('Get employer:', data, loading);
            this.employer.next(data.getEmployer);
          });
      });
  }

  getEmployer(): Observable<Employer> {
    return this.employer.asObservable();
  }

  registerCompany(employer: Employer): void {
    console.log('Made it to service', employer);
    this.apollo
      .mutate<any>({
        mutation: registerEmployer,
        variables: {
          ...employer,
        },
      })
      .subscribe(
        ({ data }) => {
          if (data.registerEmployer) {
            this.userService
              .getUser()
              .pipe(first())
              .subscribe((user) => {
                const userUpdated: User = { ...user };
                userUpdated.role = 'employer';
                this.userService.setUser(userUpdated);
                this.router.navigate(['/employers']);
              });
          }
          console.log('Register Employer complete', data);
          // this.userProfile.next({ ...data.createProfile });
          // this.userProfile.subscribe((data) => console.log(data));

          // Add data to user using deconstructor
          // this.userProfile = { ...data['createdProfile'] };
          // Return to profile
          // this.router.navigate(['/profile']);
        },
        (error) => {
          // Stop loading
          // this.authService.loading.next(true);
          console.log('there was an error sending the query', error);
        }
      );
  }

  addJob(job: Job): void {
    console.log('made it to services', job);
    this.apollo
      .mutate<any>({
        mutation: createJob,
        variables: {
          ...job,
        },
      })
      .subscribe(
        ({ data }) => {
          console.log('Job create complete', data);
          // this.userProfile.next({ ...data.createProfile });
          // this.userProfile.subscribe((data) => console.log(data));

          // Add data to user using deconstructor
          // this.userProfile = { ...data['createdProfile'] };
          // Return to profile
          // this.router.navigate(['/profile']);
        },
        (error) => {
          // Stop loading
          // this.authService.loading.next(true);
          console.log('there was an error sending the query', error);
        }
      );
  }
}
