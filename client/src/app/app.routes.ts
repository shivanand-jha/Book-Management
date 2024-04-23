import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path:"signin",component:SigninComponent},
    {path:"signup",component:SignupComponent},
    {path:"home",component:HomeComponent}
];
