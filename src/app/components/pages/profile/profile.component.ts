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
  public displayProfile: Boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Query to see if user is authenticated
    this.userService.getUser().subscribe((user) => {
      // Set user data
      this.user = { ...user };
      // If user is authenticated retrieve user profile
      console.log('Profile User', user);

      if (parseInt(user.id) > 0) {
        this.userService.getUserProfile().subscribe((profile) => {
          console.log('user profile:', profile);
          if (profile) {
            // Set profile data
            this.profile = { ...profile };
            if (this.profile.statement !== '') {
              this.displayProfile = true;
            }
            // Convert from JSON to education objects
            this.profile.education.forEach((education) => {
              const jsonEduc = JSON.parse(JSON.stringify(education));
              this.educations.push(JSON.parse(jsonEduc));
            });
            // Convert from JSON to work experience objects
            this.profile.workExperience.forEach((workExperience) => {
              const jsonWork = JSON.parse(JSON.stringify(workExperience));
              this.workExperiences.push(JSON.parse(jsonWork));
            });
          }
        });
      }
    });
  }
}
