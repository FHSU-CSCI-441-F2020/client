import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { Education } from '../../../models/education';
import { WorkExperience } from '../../../models/workexperience';
import { UserProfile } from '../../../models/userprofile';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss'],
})
export class CandidateProfileComponent implements OnInit {
  private id: string;
  public user: User;
  public profile: UserProfile;
  public educations: Education[] = [];
  public workExperiences: WorkExperience[] = [];
  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.userService.queryProfile(this.id);
    this.userService.getProfile().subscribe((profile) => {
      console.log(profile);

      if (profile !== null) {
        console.log('Within profile if', profile);

        this.user = { ...profile.getProfile.user };
        this.profile = { ...profile.getProfile.userProfile };
        // Convert from JSON to education objects
        console.log(this.profile.education);

        if (this.profile?.education !== undefined) {
          this.profile.education.forEach((education) => {
            const jsonEduc = JSON.parse(JSON.stringify(education));
            this.educations.push(JSON.parse(jsonEduc));
          });
        }
        // Convert from JSON to work experience objects
        if (this.profile?.workExperience !== undefined) {
          this.profile.workExperience.forEach((workExperience) => {
            const jsonWork = JSON.parse(JSON.stringify(workExperience));
            this.workExperiences.push(JSON.parse(jsonWork));
          });
        }
      }
    });
  }
}
