import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule ,RouterModule],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css'
})
export class UpdateBookComponent implements OnInit{
  // constructor() { }
    fb = inject(FormBuilder);
    router = inject(Router);
    route = inject(ActivatedRoute);
    // formDataService = inject(FormDataService);
    bookService = inject(BookService);
    updateBookForm !: FormGroup;
    
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const index = +params['id'];
        this.bookService.updateBookService(index).subscribe({
          next:(res)=>{
            console.log(res);
            alert("User Updated");
            // this.createBookForm.user.value = localStorage.getItem('user_Id');
            this.updateBookForm.reset();
            this.router.navigate(['home']);
          },
          error:(err)=>{
            alert(err.message);
          }
        })
      });
    }

    submitForm(){
      console.log(this.updateBookForm.value);
     
    }
}
