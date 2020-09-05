import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isAuthenticated: boolean = false;
  public loading: boolean = true;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Watch for loading changes
    this.authService.isLoaded().subscribe((loading) => {
      this.loading = loading;
    });
  }
}
