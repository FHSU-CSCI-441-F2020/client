import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserProfile } from '../../../models/userprofile';
import { User } from '../../../models/user';
import { Education } from '../../../models/education';
import { WorkExperience } from '../../../models/workexperience';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public user: User;
  public profile: UserProfile;
  public educations: Education[] = [];
  public workExperiences: WorkExperience[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Query to see if user is authenticated
    this.userService.getUser().subscribe((user) => {
      // Set user data
      this.user = { ...user };
      // If user is authenticated retrieve user profile
      if (parseInt(this.user.id) > 0) {
        this.userService.getUserProfile().subscribe((profile) => {
          // Set profile data
          this.profile = { ...profile };
          // Convert from JSON to education objects
          this.profile.education.forEach((education) => {
            this.educations.push(JSON.parse(JSON.stringify(education[0])));
          });
          // Convert from JSON to work experience objects
          this.profile.workExperience.forEach((workExperience) => {
            this.workExperiences.push(
              JSON.parse(JSON.stringify(workExperience[0]))
            );
          });
        });
      }
    });
  }
}
