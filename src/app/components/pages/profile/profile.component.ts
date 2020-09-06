import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserProfile } from '../../../models/userProfile';
import { User } from '../../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public profile: UserProfile;
  public user: User;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = { ...user };
    });
    // this.user = this.userService.getUser();
    this.userService.getUserProfile().subscribe((profile) => {
      this.profile = { ...profile };
      console.log(profile.address2);
    });
  }
}
