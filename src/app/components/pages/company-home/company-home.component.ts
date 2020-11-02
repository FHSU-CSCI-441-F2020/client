import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../../services/jobs.service';
import { EmployerService } from '../../../services/employer.service';
import { Job } from '../../../models/job';
import { Employer } from 'src/app/models/employer';
@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss'],
})
export class CompanyHomeComponent implements OnInit {
  public jobs: [Job];
  public job: Job;
  public employer: Employer;
  constructor(
    private jobsService: JobsService,
    private employerService: EmployerService
  ) {}

  ngOnInit(): void {
    this.employerService.getEmployer().subscribe((employer) => {
      console.log(employer);

      if (employer !== null) {
        this.employer = employer;
        this.jobsService.queryJobs({ owner: employer.id });
      }
    });
    this.jobsService.getJobs().subscribe((jobs) => {
      if (jobs) {
        this.jobs = jobs;
      }
    });
  }

  selectJob(job: Job): void {
    this.job = job;
  }
}
