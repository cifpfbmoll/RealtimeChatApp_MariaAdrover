import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

// We need all that elements to implement the protection of routes with an Authentication Guard
import { Alert } from './../classes/alert';
import { AlertType } from './../enums/alert-type.enum';
import { AlertService } from './../services/alert.service';
import { AuthService } from './../services/auth.service';
import { map, take, tap } from 'rxjs/operators';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  // we implement the canActivate fun
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
   
      return this.auth.currentUser.pipe(
        take(1),
        map((currentUser) => !!currentUser),
        tap((loggedIn) => {
          if (!loggedIn) {
            this.alertService.alerts.next(new Alert('You must be logged in to access that page.', AlertType.Danger));
            this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }});
          }
        })
      )
 
  }
}
