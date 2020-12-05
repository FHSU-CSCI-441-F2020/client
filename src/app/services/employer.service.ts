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
import { JobsService } from './jobs.service';
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
    $owner: ID!
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
      owner: $owner
    ) {
      name
      description
      requirements
      owner
      active
      hours
      city
      state
      zip
      country
      applicants {
        id
        firstName
        lastName
      }
    }
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
  private defaultEmployer: Employer = {
    id: '',
    name: '',
    jobs: [''],
    email: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: 0,
    country: '',
  };
  constructor(
    private apollo: Apollo,
    private userService: UserService,
    private jobService: JobsService,
    private router: Router
  ) {
    console.log('Employer Service Started');

    this.employer = new BehaviorSubject<Employer>(this.defaultEmployer);

    this.userService
      .getUser()
      .pipe(first())
      .subscribe((user) => {
        if (user) {
          console.log(user);

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
        }
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
    const owner = this.employer.getValue().id;
    this.apollo
      .mutate<any>({
        mutation: createJob,
        variables: {
          owner: owner,
          ...job,
        },
      })
      .subscribe(
        ({ data }) => {
          console.log('Job create complete', data);
          if (data) {
            this.jobService.setJobs(data.createJob);
          }
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
