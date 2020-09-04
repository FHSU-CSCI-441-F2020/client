import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  greeting: any;
  token: string;
  constructor(private authService: AuthService) {}
  public userAuthenticated: any;

  ngOnInit(): void {
    // this.authService.getResults().subscribe((data) => (this.greeting = data));
    // this.authService.getUser();
    // this.authService.isAuthenticated().subscribe((data) => {
    //   console.log(data);
    //   this.userAuthenticated = data;
    // });

    this.userAuthenticated = this.authService
      .isAuthenticated()
      .subscribe((data) => {
        // this.userAuthenticated = data >= 1 ? true : false;
        console.log(data);
        this.userAuthenticated = data.me.id >= 1 ? true : false;
      });
  }

  // updateName() {
  //   // this.greeting = this.authService.getUser();
  //   this.authService.getUser().subscribe((data) => (this.greeting = data));
  // }
}
