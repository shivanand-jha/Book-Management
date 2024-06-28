import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './components/book/book.component';
import { UpdateBookComponent } from './pages/update-book/update-book.component';
import { authGuard,adminAuthGuard } from './auth.guard';
import { UserpermitComponent } from './pages/userpermit/userpermit.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    {path:"signin",component:SigninComponent},
    {path:"signup",component:SignupComponent},
    {path:"home",component:HomeComponent, canActivate:[authGuard]},
    {path:"create",component:BookComponent, canActivate:[authGuard]},
    {
        path:"home/update/:id",
        component:UpdateBookComponent,canActivate:[authGuard]
    },
    {
        path:"userpermit",
        component:UserpermitComponent,canActivate:[adminAuthGuard]
    },{
        path:"users",
        component:UsersComponent,
        canActivate:[adminAuthGuard]
    }

];


/// interceptors 

// 1. Interceptors are used to intercept the request and response of the http client.
// 2. Interceptors are used to add headers to the request and to handle errors.
// 3. Interceptors are used to add authentication to the request.   