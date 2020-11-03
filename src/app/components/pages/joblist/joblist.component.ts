import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../../services/jobs.service';
import { Job } from '../../../models/job';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.scss']
})
export class JoblistComponent implements OnInit {
  title
  location
  gFilter
  gCategories
  lCategory
  category
  FilteredJobs
  gFilteredJobs
  searchFilter

  public job: [Job];

  constructor(private jobsServices: JobsService) { }

  ngOnInit(): void {
    console.log('testing to see');
    this.jobsServices.queryJobs({active: true});//query active jobs listings
    this.jobsServices.getJobs().subscribe(jobs =>{
      this.job = jobs;
      console.log(this.job);

    })


    
  }



  enterSearch(){
    console.log('update');

  }

  setCategory(string){

  }
  

}
