import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { async } from 'rxjs/internal/scheduler/async';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public userAuthenticated: any;
  public isAuthenticated: boolean = false;
  public condition: any = true;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.userAuthenticated = this.authService
      .isAuthenticated()
      .subscribe((data) => {
        this.isAuthenticated = data;
        console.log(data);
      });
  }

  logout(): void {
    this.isAuthenticated = false;
    this.authService.logout();
  }
  // updateName() {
  //   // this.greeting = this.authService.getUser();
  //   this.authService.getUser().subscribe((data) => (this.greeting = data));
  // }
}
