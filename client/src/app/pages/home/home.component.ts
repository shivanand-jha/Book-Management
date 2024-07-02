import { Component, OnInit, inject } from '@angular/core';
import { Book, BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../../components/card/card.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, CardComponent, HeaderComponent]
})
export class HomeComponent implements OnInit{

private bookService = inject(BookService);
books:Book[] = [];
id:any = localStorage.getItem("user_id");
isAdmin: boolean = localStorage.getItem('isAdmin') === 'true';
currentPage = 1;
itemsPerPage: number = 12; 
totalCount:number= 0;
totalPages:number = 1;




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

  
  getAll():void{
  this.bookService.getAllBook(this.currentPage, this.itemsPerPage)
      .subscribe(response => {
        this.books = response.items;
        this.totalCount = response.totalCount;
        this.totalPages = Math.ceil(this.totalCount / this.itemsPerPage);
      });
    }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.getAll();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAll();

    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAll();

    }
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

}
