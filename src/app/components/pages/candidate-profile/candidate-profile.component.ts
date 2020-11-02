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
      if (profile !== null) {
        this.user = { ...profile.user };
        this.profile = { ...profile.userProfile };
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
      }
    });
  }
}
