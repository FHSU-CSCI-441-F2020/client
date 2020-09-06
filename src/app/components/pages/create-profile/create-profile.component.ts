import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserProfile } from '../../../models/userProfile';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],
})
export class CreateProfileComponent implements OnInit {
  public userProfile: UserProfile = {
    statement: '',
    education: [''],
    workExperience: [''],
    lookingFor: [''],
    skills: [''],
    active: false,
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: 0,
    country: '',
    userId: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  /**
   *  Submits user to be registered
   */
  onSubmit(): void {
    this.userService.submitProfile(this.userProfile);
  }
}
