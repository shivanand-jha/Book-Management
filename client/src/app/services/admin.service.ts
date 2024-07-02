import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  http = inject(HttpClient);
  
  constructor() { }
  getUser(){
    return this.http.get<Response<User[]>>(`${apiUrls.apiServiceUser}user`);
  }



  updateUserStatus(userId: string): Observable<any> {
    return this.http.put<any>(`${apiUrls.apiServiceUser}updateuser/${userId}`,{});
  }


}
export type Response<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
};
export type User ={
  firstName:string,
  _id:string,
  lastName:string,
  userName:String,
  img:string  ,
  email:String,
  disable:boolean
}