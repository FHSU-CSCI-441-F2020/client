import { Component, EventEmitter, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserProfile } from '../../../models/userprofile';
import { Education } from '../../../models/education';
import { WorkExperience } from '../../../models/workexperience';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],
})
export class CreateProfileComponent implements OnInit {
  public userProfile: UserProfile = {
    userId: '',
    statement: '',
    education: [],
    workExperience: [],
    lookingFor: [],
    skills: [],
    active: false,
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: 0,
    country: '',
  };

  public workExperiences: WorkExperience[] = [];
  public workExperience: WorkExperience;
  private defaultWorkExperience: WorkExperience = {
    id: '',
    company: '',
    title: '',
    currentlyEmployed: false,
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    jobDescription: '',
    city: '',
    state: '',
  };

  public educations: Education[] = [];
  public education: Education;
  private defaultEducation: Education = {
    id: '',
    school: '',
    completed: false,
    completionDate: '',
    fieldOfStudy: '',
    educationLevel: '',
    city: '',
    state: '',
  };

  public pagePosition: number = 0;
  private progressBar: HTMLElement;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.progressBar = document.getElementById('progress-bar');
    this.workExperience = { ...this.defaultWorkExperience };
    this.education = { ...this.defaultEducation };
  }

  /**
   *  Submits profile to be created
   */
  onSubmit(): void {
    // Convert each education & work experience objects into a JSON
    this.educations.forEach((education) => {
      this.userProfile.education.push(JSON.parse(JSON.stringify(education)));
    });
    this.workExperiences.forEach((workExperience) => {
      this.userProfile.workExperience.push(
        JSON.parse(JSON.stringify(workExperience))
      );
    });
    // Send profile to be added to DB
    this.userService.submitProfile(this.userProfile);
  }

  /**
   *  Creates a unique id string
   */
  createId(): string {
    return Math.random().toString(36).slice(2);
  }

  /**
   *  Adds education to educations array with added id
   */
  addEducation(): void {
    this.education.id = this.createId();
    this.educations.push(this.education);
    // Clear education
    this.education = { ...this.defaultEducation };
  }

  /**
   *  Deleted education from array
   *
   * @param id Id of the selected education
   */
  deleteEducation(id: string): void {
    // Get index of education to remove
    const index = this.educations.findIndex((education) => education.id === id);
    if (index !== -1) {
      this.educations.splice(index, 1);
    }
  }

  /**
   *  Adds work experience to work experiences array with added id
   */
  addWorkExperience(): void {
    this.workExperience.id = this.createId();
    this.workExperiences.push(this.workExperience);
    this.workExperience = { ...this.defaultWorkExperience };
  }

  /**
   *  Delete work experience from array
   *
   * @param id
   */
  deleteWorkExperience(id: string): void {
    // Get index of experience to remove
    const index = this.workExperiences.findIndex(
      (workExperience) => workExperience.id === id
    );
    if (index !== -1) {
      console.log('Got to splice');

      this.workExperiences.splice(index, 1);
    }
  }

  /**
   *  Add/remove looking for from array
   *
   * @param event HTML event element
   */
  setLookingFor(event: any): void {
    // Set index of skill if already found
    const index = this.userProfile.lookingFor.indexOf(event.target.value, 0);
    // If found remove from array otherwise add to array
    if (index !== -1) {
      this.userProfile.lookingFor.splice(index, 1);
    } else {
      this.userProfile.lookingFor.push(event.target.value);
    }
  }

  /**
   *  Adds skill into skills array
   *
   * @param event HTML event element
   */
  insertSkill(event: any): void {
    // Get nested value of skill
    const value: string = event.target.previousSibling.value;
    // Add skill value to array
    this.userProfile.skills.push(value);
    // Clear form
    event.target.previousSibling.value = '';
  }

  /**
   *  Delete skill from array
   *
   * @param event HTML event element
   */
  deleteSkill(event: any): void {
    // Find position of skill in array
    const index = this.userProfile.skills.indexOf(
      event.target.previousSibling.innerHTML,
      0
    );
    // If found, remove from array
    if (index !== -1) {
      this.userProfile.skills.splice(index, 1);
    }
  }

  /**
   *  Moves to previous page
   */
  pagePrevious(): void {
    const progressBarWidth = --this.pagePosition * 20;
    this.progressBar.style.width = progressBarWidth.toString();
  }

  /**
   *  Moves to next page
   */
  pageNext(): void {
    const progressBarWidth = ++this.pagePosition * 20;
    this.progressBar.style.width = progressBarWidth.toString() + '%';
  }
}
