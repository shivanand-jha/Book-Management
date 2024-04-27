import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './components/book/book.component';
import { UpdateBookComponent } from './pages/update-book/update-book.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:"signin",component:SigninComponent},
    {path:"signup",component:SignupComponent},
    {path:"home",component:HomeComponent,canActivate:[authGuard]},
    {path:"create",component:BookComponent,canActivate:[authGuard]},
    {
        path:"home/update/:id",
        component:UpdateBookComponent
    },
];
