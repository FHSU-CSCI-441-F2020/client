import { Component, OnInit } from '@angular/core';
import { Employer } from '../../../models/employer';
import { EmployerService } from '../../../services/employer.service';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss'],
})
export class CompanyRegisterComponent implements OnInit {
  public employer: Employer = {
    name: '',
    email: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: 0,
    country: '',
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
