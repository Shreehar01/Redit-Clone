import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignupRequestPayload} from '../signup/signup-request.payload';
import { Observable } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import {LoginResponse} from '../login/login-response.payload';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
        return true;
    }));

    
  }


  refreshToken(){
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    }

    return this.httpClient.post<LoginResponse>('loginapi', refreshTokenPayload)
    .pipe(tap(response =>{
      this.localStorage.store('authenticationToken', response.authenticationToken);
      this.localStorage.store('expiresAt', response.expiresAt);
    }))
  }

  getUserName(){
    return this.localStorage.retrieve('username');
  }

  getRefreshToken(){
    return this.localStorage.retrieve('refreshToken');
  }

  getJwtToken(){
    return this.localStorage.retrieve('authenticationToken');
  }
}
