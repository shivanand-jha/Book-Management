import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, retry } from 'rxjs';
import { apiUrls } from '../api.url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  signupService(signupObj:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}signup`,signupObj);
  }
  

  signinService( siginObj:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}signin`,siginObj);
  }


    isLoggedIn(){
      return !!localStorage.getItem('user_id');
    }
  

    isLoggedOut() {
      return !this.isLoggedIn();
    }

   


}
