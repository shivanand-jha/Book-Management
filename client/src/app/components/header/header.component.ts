import { Component, OnInit, Output, inject } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome ,faBook , faCartPlus ,faSignOut,faSearch,faSignIn,faReceipt, faL, faNoteSticky, faNotesMedical} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule,RouterModule,CommonModule,RouterLink,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  router = inject(Router);
  faHome = faHome;
  faBook = faBook;
  faCart = faNotesMedical;
  faSignOut = faSignOut;
  faSignIn = faSignIn;
  faReg = faReceipt;
  faSearch = faSearch;

   userName: string='';

  authService = inject(AuthService);
  isLoggedIn:boolean = false;


  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.authService.isLoggedIn();
    });
     this.userName = localStorage.getItem('userName')!;
  }


  logOut() {
    localStorage.removeItem('user_id');
    this.authService.isLoggedIn$.next(false);
    this.router.navigate(['/signin'])
  }

}
