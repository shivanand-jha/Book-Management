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
