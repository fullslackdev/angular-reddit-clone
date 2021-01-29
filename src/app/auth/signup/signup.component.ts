import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignupRequestPayload} from './signup-request.payload';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;
  email: FormControl;
  username: FormControl;
  password: FormControl;

  constructor(private authService: AuthService) {
    this.signupRequestPayload = {
      email: '',
      username: '',
      password: ''
    };
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.signupForm = new FormGroup({
      email: this.email,
      username: this.username,
      password: this.password
    });
  }

  ngOnInit(): void {
  }

  signup(): void {
    this.signupRequestPayload.email = this.email.value;
    this.signupRequestPayload.username = this.username.value;
    this.signupRequestPayload.password = this.password.value;

    this.authService.signup(this.signupRequestPayload).subscribe(data => {
        console.log(data);
      });
  }
}
