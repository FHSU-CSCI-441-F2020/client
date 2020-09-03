import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  greeting: any;
  token: string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getResults().subscribe((data) => (this.greeting = data));
    this.authService.getUser();
  }

  updateName() {
    // this.greeting = this.authService.getUser();
    this.authService.getUser().subscribe((data) => (this.greeting = data));
  }
}
