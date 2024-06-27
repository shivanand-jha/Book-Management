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

  getBooks(id:string) {
    return this.http.get<Response<Book[]>>(`${apiUrls.apiServiceBook}/user/${id}`);
  }
  getAllBook(){
    return this.http.get<Response<Book[]>>(`${apiUrls.apiServiceBook}`);
  }

  createBookService(createBookObj: any) {
    return this.http.post<any>(
      `${apiUrls.apiServiceBook}create`,
      createBookObj
    );
  }

  updateBookService(id: string, updateBookObj: any) {
    return this.http.put<any>(
      `${apiUrls.apiServiceBook}update/${id}`,
      updateBookObj
    );
  }
  deleteBookService(id: string) {
    return this.http.delete<any>(`${apiUrls.apiServiceBook}delete/${id}`);
  }

  getByIdBookService(id: string) {
    return this.http.get<any>(`${apiUrls.apiServiceBook}/${id}`);
  }
}
export type Book = {
  _id: string;
  title: string;
  //   isbn13: string;
  imageLink: string;
  author: string;
  pages: number;
  year: number;
  language: string;
  country: string;
  price: number;
  //   description: string;
  link: string;
  user: string;
};

export type Response<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
};
