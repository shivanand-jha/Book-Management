import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink,RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {
    fb = inject(FormBuilder);
    authSevice = inject(AuthService);
    router  =  inject(Router);
    signinForm !: FormGroup;
    userService = inject(UserService);


    userName:string = "Hello UserName";
    
    ngOnInit(): void {
      this.signinForm = this.fb.group({
          email: ['',Validators.compose([Validators.required,Validators.email])],
          password: ['',Validators.required]
      })

  }




  signin(){
    this.authSevice.signinService(this.signinForm.value).subscribe({
      next:(res)=>{
        // alert("SignIn Successfull");
        localStorage.setItem("user_id",res.data._id);
        this.userName = res.data.userName;
        localStorage.setItem("isAdmin",res.data.isAdmin);
        // console.log(res.data.isAdmin + "Hello Admin");
        localStorage.setItem('userName',res.data.userName);
        // console.log(res);
        this.authSevice.isLoggedIn$.next(true);
        this.router.navigate(['/home'])
        // this.authSevice.setToken(res.token);
        this.signinForm.reset();
      },error:(err)=>{
        console.log(err);
      }
    })
  }
  



  sendData() {
    this.userService.changeMessage(this.userName);
  }
}
