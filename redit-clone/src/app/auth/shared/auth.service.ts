import { Injectable, Output } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignupRequestPayload} from '../signup/signup-request.payload';
import { Observable, throwError } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import {LoginResponse} from '../login/login-response.payload';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { tap } from 'rxjs';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: any = new EventEmitter();
  @Output() username: any = new EventEmitter();
  

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload) : Observable<any> {
    return this.httpClient.post('urlforsignupapi', signupRequestPayload, {responseType: 'text'});
  }

  login(loginRequestPayload: LoginRequestPayload) : Observable<any>{
    return this.httpClient.post<LoginResponse>('urlforloginapi', loginRequestPayload).pipe(map(data =>{
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);


        this.loggedIn.emit(true);
        this.username.emit(data.username);
        return true;
    }));

    
  }

  getJwtToken() {
    return this.localStorage.retrieve('athenticationToken');
  }

  refreshToken(){
    return this.httpClient.post<LoginResponse>('loginapi', this.refreshTokenPayload)
    .pipe(tap(response =>{
      this.localStorage.clear('authenticationToken');
      this.localStorage.clear('expiresAt');
      this.localStorage.store('authenticationToken', response.authenticationToken);
      this.localStorage.store('expiresAt', response.expiresAt);
    }))
  }

  logout(){
    this.httpClient.post('url', this.refreshTokenPayload, {responseType: 'text'})
    .subscribe( data => {
      console.log(data);
    }), (error: any) => {
      throwError(error);
    }
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

  getUserName(){
    return this.localStorage.retrieve('username');
  }

  getRefreshToken(){
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
