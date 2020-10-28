import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  enterSearch(){

  }

  setCategory(string){

  }
  

}
