import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Book } from '../../services/book.service';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({ required: true }) book!: Book;
}
