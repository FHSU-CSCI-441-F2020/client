import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.username, this.password);
    this.authService.loginUser(this.username, this.password);
  }
}
