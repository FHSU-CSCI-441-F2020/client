import { Component, OnInit } from '@angular/core';
import { Jobs } from '../../../models/jobs';
import { EmployerService } from '../../../services/employer.service';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.scss'],
})
export class JobCreateComponent implements OnInit {
  public job: Jobs = {
    name: '',
    description: '',
    requirements: '',
    location: '',
    hours: '',
  };
  constructor(private employerService: EmployerService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('made it to component');
  }
}
