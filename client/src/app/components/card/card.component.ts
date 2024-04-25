import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Book } from '../../services/book.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({ required: true }) book!: Book;
  dropdownStates: boolean[] = [];
  flg:boolean = false;  
  _id:string = '';
  over(){
    this.flg = true;
  }

  out(){
    this.flg = false;
  }


  
}
 

