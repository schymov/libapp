import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

interface ParcedToken {
  username: string;
  email: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  getFromLocalStorage(key: string): ParcedToken {
    const localData = localStorage.getItem(key);
    return localData ? JSON.parse(localData) : null;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userInfo = this.getFromLocalStorage('userInfo');
    if (userInfo?.exp) {
      const expireDate: number = userInfo?.exp * 1000;
      const currentDate: number = Date.now();
      const diffDate = expireDate - currentDate;
      if (diffDate > 0) {
        return true;
      } else {
        this.router.navigateByUrl('auth/signin');
      }
    } else {
      this.router.navigateByUrl('auth/signin');
    }
    return false;
  }
}
