import { Component, OnInit } from '@angular/core';
import { Employer } from '../../../models/Employer';
import { EmployerService } from '../../../services/employer.service';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss'],
})
export class CompanyRegisterComponent implements OnInit {
  public employer: Employer = {
    name: 'Lutd',
    email: 'lutd@email.com',
    phoneNumber: '1112223333',
    address1: '123 Main St',
    address2: '',
    city: 'Kansas City',
    state: 'MO',
    zip: 64151,
    country: 'USA',
  };
  // public employer: Employer = {
  //   name: '',
  //   email: '',
  //   phoneNumber: '',
  //   address1: '',
  //   address2: '',
  //   city: '',
  //   state: '',
  //   zip: 0,
  //   country: '',
  // };
  constructor(private employerService: EmployerService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.employerService.registerCompany(this.employer);
  }
}
