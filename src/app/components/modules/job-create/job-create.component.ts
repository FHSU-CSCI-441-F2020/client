import { Component, OnInit } from '@angular/core';
import { Job } from '../../../models/job';
import { EmployerService } from '../../../services/employer.service';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.scss'],
})
export class JobCreateComponent implements OnInit {
  public job: Job = {
    name: 'Full Stack Developer',
    description: 'Build cool stuff',
    requirements: 'Angular',
    city: 'Kansas City',
    state: 'MO',
    zip: 64151,
    country: 'USA',
    hours: '9-5 M-F',
  };
  constructor(private employerService: EmployerService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.employerService.addJob(this.job);
  }
}
