import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public userLoggedIn: boolean;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to watch for any updated to the users authentication status
    this.authService.isAuthenticated().subscribe((status) => {
      this.userLoggedIn = status;
    });
  }
}
