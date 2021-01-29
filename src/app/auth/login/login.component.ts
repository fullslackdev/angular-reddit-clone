import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequestPayload} from './login-request.payload';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequestPayload: LoginRequestPayload;
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor(private authService: AuthService) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    this.loginRequestPayload.username = this.username.value;
    this.loginRequestPayload.password = this.password.value;
    this.authService.login(this.loginRequestPayload).subscribe(data => {
      console.log('Login successful');
    });
  }

}
