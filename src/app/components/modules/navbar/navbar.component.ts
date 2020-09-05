import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public userLoggedIn: boolean;
  public activeUser: User;

  constructor(
    public authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Subscribe to watch for any updated to the users authentication status
    this.authService.isAuthenticated().subscribe((status) => {
      this.userLoggedIn = status;
    });
  }
}
