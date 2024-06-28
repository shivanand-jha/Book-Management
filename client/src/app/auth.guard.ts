import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let isLoggedIn  = localStorage.getItem("userName");
  const router = inject(Router);
  if(!isLoggedIn){
    alert("Please login to continue");
    router.navigate(['/signin']);
    return false;
  }
  return true;
};
export const adminAuthGuard: CanActivateFn = (route, state) => {
  let isAdmin  = localStorage.getItem("isAdmin");
  const router = inject(Router);
  if(!isAdmin){
    alert("Please signin as Admin");
    router.navigate(['/signin']);
    return false;
  }
  return true;
};