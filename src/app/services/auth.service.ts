import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { Alert } from './../classes/alert';
import { AlertService } from './alert.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;

  constructor(private router: Router, private alertService: AlertService) {
    this.currentUser = of(null);
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    // TODO call Firebase signup function
    return of(true);
  }

  public login(email: string, password: string): Observable<boolean> {
    // TODO call Firebase login function
    return of(true);
  }

  public logout(): void { //al pulsar logout ira a la pagina del login
    // TODO call Firebase login function
    this.router.navigate(['/login'])
    this.alertService.alerts.next(new Alert('You have been signed out'))
  }


}
