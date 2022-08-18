import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  public allowedUsers: number[] = [2, 68, 108, 109, 117, 137];

  constructor(
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const queryParams = route.queryParamMap;
    const userOdoo = queryParams['params']['user_odoo'];
    if (!this.allowedUsers.includes(parseInt(userOdoo)) || userOdoo == undefined) {
      this.router.navigate(['noAccess']);
      return false;
    }
    return true;
  }

}
