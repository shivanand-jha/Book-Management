import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.url';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  http = inject(HttpClient);
  constructor() { }
  getUser(){
    return this.http.get<Response<User[]>>(`${apiUrls.apiServiceUser}user`);
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
  id:string,
  lastName:string,
  userName:String,
  img:string  
}