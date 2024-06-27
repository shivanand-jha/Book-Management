import { Component, OnInit, inject } from '@angular/core';
import { Book, BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../../components/card/card.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, CardComponent]
})
export class HomeComponent implements OnInit{

private bookService = inject(BookService);
books:Book[] = [];
id:any = localStorage.getItem("user_id");
isAdmin: boolean = localStorage.getItem('isAdmin') === 'true';

currentPage: number = 1; // Current page
itemsPerPage: number = 12; // Number of items per page




  constructor(){}


  ngOnInit(): void {
  //  this.getBook();
  this.getBook();
  }

getBook(){
  if(this.isAdmin){
      this.getAll();
  }else{
    this.getBooks();
  }
}
  getBooks(){
    this.bookService.getBooks(this.id).subscribe({
      next : (res) => {
        console.log(res);
        this.books = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
  })
}

  getAll(){
    this.bookService.getAllBook().subscribe({
      next : (res) => {
        this.books = res.data;
        console.log(this.books);
        },
        error:(err)=>{
          console.log(err);
        }
      }
  )}
  





  get totalPages(): number {
    return Math.ceil(this.books.length / this.itemsPerPage);
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get pagedBooks(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.books.length);
    return this.books.slice(startIndex, endIndex);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

}
