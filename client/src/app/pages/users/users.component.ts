import { Component, NgModule, OnInit, inject } from '@angular/core';
import { AdminService, User } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { Book, BookService } from '../../services/book.service';
import { CardComponent } from "../../components/card/card.component";
@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
    imports: [CommonModule, FormsModule, CardComponent]
})
export class UsersComponent implements OnInit {
  private adminService = inject(AdminService);
  private bookService = inject(BookService);
  users:User[] = [];
  books:Book[] = []; 
  selectedValue: string | undefined;
  // selectedUserId:string | undefined;
  constructor() { }


  ngOnInit():void{
    this.getUsers();
  }
  
  getUsers(){
    this.adminService.getUser().subscribe({
      next : (res) => {
        console.log(res.data);
        this.users = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
  })
}

onSelectionChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  this.selectedValue = target.value;
  // console.log('Selected Value:', this.selectedValue);
  this.bookService.getBooks(this.selectedValue).subscribe({
    next: (res) => {
      this.books = res.data;
      console.log(res.data);
    },error:(err)=>{
      console.log(err);
    }
  })
}


}
