import { Injectable } from '@angular/core';
// import { Employer } from '../models/employer';
// import { User } from '../models/user';
import { Job } from '../models/job';
// import { UserService } from './user.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
// import { first } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Query for getting single job
 */
const getJob = gql`
  query getJobs($id: ID) {
    getJobs(id: $id) {
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
 * Query for getting multiple jobs
 */
const getJobs = gql`
  query getJobs($owner: String, $active: Boolean) {
    getJobs(owner: $owner, active: $active) {
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

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private job: BehaviorSubject<Job>;
  private jobs: BehaviorSubject<[Job]>;

  constructor(private apollo: Apollo) {
    this.job = new BehaviorSubject<Job>(null);
    this.jobs = new BehaviorSubject<[Job]>(null);
  }

  public queryJobs(args: {}): void {
    this.apollo
      .watchQuery<any>({
        query: getJobs,
        variables: { ...args },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(data, loading);
        this.jobs.next(data.getJobs);
      });
  }

  public getJobs(): Observable<[Job]> {
    return this.jobs.asObservable();
  }
}
