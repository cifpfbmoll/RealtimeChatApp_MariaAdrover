import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { Alert } from './../classes/alert';
import { AlertService } from './alert.service';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<User | null>;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    // Fetch the user from the Firebase backend, then set the currentUser
    this.currentUser = this.afAuth.authState.pipe(switchMap((user) => {
      if (user) {
        return this.db.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }))
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    //Firebase create a user with email And password...
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
          //... and the values that will be stored in the user fields of Firebase
          const updatedUser = {
            id: user.user.uid,
            email: user.user.email,
            firstName,
            lastName,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/chat-4d2b3.appspot.com/o/supermanC.jpg?alt=media&token=1acdeb80-34b1-4f93-9d74-5a9290839a21'
          }
          userRef.set(updatedUser);
          return true;
        })
        .catch((err) => false)
    );
  }

  public login(email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => true)
        .catch((err) => false)
    );
  }

  public logout(): void { //When logout link is clicked, it goes to login page and shows an alert (Success.type by default)
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login'])
      this.alertService.alerts.next(new Alert('You have been signed out'))
    });
  }
}
