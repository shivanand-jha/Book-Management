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
  constructor(){}

  ngOnInit(): void {
    this.getBooks();
  }
  getBooks(){
    this.bookService.getBooks().subscribe({
      next : (res) => {
        console.log(res);
        this.books = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
  })
  }

}
