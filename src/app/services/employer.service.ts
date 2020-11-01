import { Injectable } from '@angular/core';
import { Employer } from '../models/Employer';
import { User } from '../models/User';
import { UserService } from './user.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { first } from 'rxjs/operators';
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

@Injectable({
  providedIn: 'root',
})
export class EmployerService {
  constructor(private apollo: Apollo, private userService: UserService) {}

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
}
