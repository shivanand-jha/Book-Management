import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { confirmPasswordValidator } from '../../validatros/confirmPassword.Validators';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  singupForm !: FormGroup;
  ngOnInit(): void {
    this.singupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['',Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }
  onSubmit() {
      this.authService.signupService(this.singupForm.value).subscribe({
        next:(res)=>{
          alert("User Created");
          this.singupForm.reset();
          this.router.navigate(['signin']);
        },
        error:(err)=>{
          alert(err.message);
        }
      })
  }


}
