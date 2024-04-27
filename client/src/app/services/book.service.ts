import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../api.url';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  static deleteBookService(id: string) {
    throw new Error('Method not implemented.');
  }
  http = inject(HttpClient);
  // id:string = '';
  // constructor(private http: HttpClient) {}
  // constructor(http:HttpClient){
  //     this.http=http;
  // }

  getBooks() {
    return this.http.get<Response<Book[]>>(`${apiUrls.apiServiceBook}/`);
  }
  // getBookById(id) {
  //   return this.http.get<Response<Book[]>>(`${apiUrls.apiServiceBook}/id`);
  // }
  
  createBookService(createBookObj:any){
    return this.http.post<any>(`${apiUrls.apiServiceBook}create`,createBookObj);
  }
  

  updateBookService(id:string , updateBookObj:any){
    return this.http.put<any>(`${apiUrls.apiServiceBook}update/${id}`,updateBookObj);
  }
  deleteBookService(id:string ){
    return this.http.delete<any>(`${apiUrls.apiServiceBook}delete/${id}`);
  }


  getByIdBookService(id: string){
    return this.http.get<any>(`${apiUrls.apiServiceBook}/${id}`);
  }

}
export type Book = {
  _id: string;
  title: string;
//   isbn13: string;
  imageLink:string,
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
