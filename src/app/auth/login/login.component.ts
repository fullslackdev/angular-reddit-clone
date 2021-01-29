import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequestPayload} from './login-request.payload';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {throwError} from 'rxjs';

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
  registerSuccessMessage = '';
  isError = false;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
              private router: Router, private toastr: ToastrService) {
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
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success('Signup Successful');
        this.registerSuccessMessage = 'Please check your inbox for activation email & '
          + 'activate your account before you login!';
      }
    });
  }

  login(): void {
    this.loginRequestPayload.username = this.username.value;
    this.loginRequestPayload.password = this.password.value;
    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('/').then(r => {
        this.toastr.success('Login Successful');
      });
    }, error => {
      this.isError = true;
      this.toastr.error('Player Defeated');
      throwError(error);
    });
  }

}
