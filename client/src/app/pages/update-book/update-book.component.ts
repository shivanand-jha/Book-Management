import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [ CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
  })
export class UpdateBookComponent implements OnInit {
  updateBookForm !: FormGroup;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.updateBookForm = this.fb.group({
      title: '',
      author: '',
      price: '',
      year: '',
      pages: '',
      country: '',
      language: '',
      link: '',
      imageLink:''
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.loadBookData(this.id);
    });
  }

  loadBookData(id: string): void {
    this.bookService.getByIdBookService(id).subscribe({
      next: (res) => {
        this.updateBookForm.patchValue(res.data); // Populate form values
        // alert("Book data loaded by ID");
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }

  submitForm(): void {
    console.log(this.updateBookForm.value);
    this.bookService.updateBookService(this.id, this.updateBookForm.value).subscribe({
      next: (res) => {
        console.log(res);
        alert("Book updated successfully");
        this.router.navigate(['home']); // Navigate to home after successful update
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }
}
