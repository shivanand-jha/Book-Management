import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{
  fb = inject(FormBuilder);
  router = inject(Router);
  bookService = inject(BookService);
  createBookForm !: FormGroup;
  userId = localStorage.getItem('user_id');
 ngOnInit(): void {
  this.createBookForm = this.fb.group({
    title: ['' , Validators.required],
    author: ['' , Validators.required],
    price: ['' , Validators.required],
    year:['',Validators.required],
    pages:['' , Validators.required],
    country:['', Validators.required],
    language:['' , Validators.required],
    link:['',Validators.required],
    imageLink:['',Validators.required],
    user: [this.userId, Validators.required]
  });
 }

  submitForm(){
    this.bookService.createBookService(this.createBookForm.value).subscribe({
      next:(res)=>{
        alert("Book Created");
        // this.createBookForm.user.value = localStorage.getItem('user_Id');
        this.createBookForm.reset();
        this.router.navigate(['home']);
      },
      error:(err)=>{
        alert(err.message);
      }
    })
  }
}
