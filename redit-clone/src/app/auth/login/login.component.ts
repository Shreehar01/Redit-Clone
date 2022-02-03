import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login-request.payload';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isError: boolean;
  registerSuccessMessage: string;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    }

    this.activatedRoute.queryParams.subscribe( params => {
      if (params?.registered !== undefined && params?.registered === 'true'){
        this.toastr.success('Signup Successful');
        this.registerSuccessMessage = 'Please check your inbox for activation link. Please activate your account before you Login!';
      }
    })
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    })
  }

    login (){
      this.loginRequestPayload.username = this.loginForm.get('username')?.value;
      this.loginRequestPayload.password = this.loginForm.get('password')?.value;

      this.authService.login(this.loginRequestPayload).subscribe( (data) =>{
        if (data){
          this.isError = false;
          this.router.navigateByUrl('/');
          this.toastr.success('Login Successful');
        } else{
          this.isError = true;
        }
      });
    }
}
