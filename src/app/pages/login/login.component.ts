import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/app/classes/alert';
import { AlertType } from './../../enums/alert-type.enum';
import { AlertService } from './../../services/alert.service';
import { LoadingService } from './../../services/loading.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Creates the form element
    this.createForm();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';
  }

  private createForm(): void {
    // Creates the form, setting the form elements properties
    this.loginForm = this.fb.group({
      // The two fields are required for the login form to be valid
      email: ['', [Validators.required, Validators.email]],
      // Password with minimum of eight characters
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submit(): void { //function called when clicking submit button
    // if ther form is valid...
    if (this.loginForm.valid) {
      // ngx-loading element will be shown
      this.loadingService.isLoading.next(true);
      // Getting email and password values from the form values
      const { email, password } = this.loginForm.value;
      // Asking to AuthService to validate the form values 
      // by pushing subscription and calling AuthService login function
      this.subscriptions.push(
        this.auth.login(email, password).subscribe(success => {
          if (success) { // If they are valid
            this.router.navigateByUrl(this.returnUrl); // Go to chat page
          } else { // If are not valid...
            this.displayFailedLogin(); // Function to show alert
          }
          // Hide ngx-loading element
          this.loadingService.isLoading.next(false);
        })
      );
      // if the form is not valid...
    } else {
      // Hide ngx-loading element and show alert
      this.loadingService.isLoading.next(false);
      this.displayFailedLogin();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private displayFailedLogin(): void {
    const failedLoginAlert = new Alert('Invalid email/password combination, try again.', AlertType.Danger);
    this.alertService.alerts.next(failedLoginAlert);
  }
}
