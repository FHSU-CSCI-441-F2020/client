import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserProfile } from '../../../models/UserProfile';
import { Education } from '../../../models/Education';
import { WorkExperience } from '../../../models/workExperience';

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
   *  Submits user to be registered
   */
  onSubmit(): void {
    console.log('onSubmit fired');

    console.log(this.userProfile);
    this.educations.forEach((education) => {
      this.userProfile.education.push(JSON.stringify(education));
    });
    this.workExperiences.forEach((workExperience) => {
      this.userProfile.workExperience.push(JSON.stringify(workExperience));
    });
    this.userService.submitProfile(this.userProfile);
  }

  createId(): string {
    return Math.random().toString(36).slice(2);
  }

  addEducation() {
    this.education.id = this.createId();
    this.educations.push(this.education);
    this.education = { ...this.defaultEducation };
  }

  deleteEducation(id: string) {
    const index = this.educations.findIndex((education) => education.id === id);
    if (index !== -1) {
      this.educations.splice(index, 1);
    }
  }

  addWorkExperience() {
    this.workExperience.id = this.createId();
    this.workExperiences.push(this.workExperience);
    this.workExperience = { ...this.defaultWorkExperience };
    console.log(this.workExperiences);
  }

  deleteWorkExperience(id: string) {
    const index = this.workExperiences.findIndex(
      (workExperience) => workExperience.id === id
    );
    console.log(index);

    if (index !== -1) {
      console.log('Got to splice');

      this.workExperiences.splice(index, 1);
    }
  }

  setLookingFor(event) {
    const index = this.userProfile.lookingFor.indexOf(event.target.value, 0);
    if (index !== -1) {
      this.userProfile.lookingFor.splice(index, 1);
    } else {
      this.userProfile.lookingFor.push(event.target.value);
    }
  }

  insertSkill(event) {
    const value: string = event.target.previousSibling.value;
    this.userProfile.skills.push(value);
    event.target.previousSibling.value = '';
  }

  deleteSkill(event) {
    const index = this.userProfile.skills.indexOf(
      event.target.previousSibling.innerHTML,
      0
    );
    console.log(index);
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
