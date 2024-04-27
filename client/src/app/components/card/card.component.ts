import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Book, BookService } from '../../services/book.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) book!: Book;

  constructor(private bookService: BookService, private router: Router,private activatedRoute : ActivatedRoute) {}

 

  deleteBook(id: string) {
    this.bookService.deleteBookService(id).subscribe({
      next: (res) => {
        console.log(res, id);
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
