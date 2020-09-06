import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public user: User = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'user',
    completedProfile: false,
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  /**
   *  Submits user to be registered
   */
  onSubmit(): void {
    this.authService.registerUser(this.user);
  }
}
