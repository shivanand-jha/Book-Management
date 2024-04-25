import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../api.url';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  http = inject(HttpClient);

  // constructor(http:HttpClient){
  //     this.http=http;
  // }

  getBooks() {
    return this.http.get<Response<Book[]>>(`${apiUrls.apiServiceBook}/`);
  }
  
  createBookService(createBookObj:any){
    return this.http.post<any>(`${apiUrls.apiServiceBook}create`,createBookObj);
  }
  

  updateBookService(updateBookObj:any){
    return this.http.put<any>(`${apiUrls.apiServiceBook}update/:id`,updateBookObj);
  }

}
export type Book = {
  _id: string;
  title: string;
//   isbn13: string;
  author: string;
  pages: number;
  year: number;
  language: string;
  country: string;
  price: number;
//   description: string;
  link: string;
};

export type Response<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
};
