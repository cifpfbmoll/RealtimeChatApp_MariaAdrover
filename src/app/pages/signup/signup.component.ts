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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
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
    this.createForm();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';
  }

  private createForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  public submit(): void {

    if (this.signupForm.valid) {
      this.loadingService.isLoading.next(true);
      const { firstName, lastName, email, password } = this.signupForm.value;
      
      this.subscriptions.push(
        this.auth.signup( firstName, lastName, email, password ).subscribe(success => {
          if (success) {
            this.router.navigateByUrl(this.returnUrl);
          }
          this.loadingService.isLoading.next(false);
        })
      )
     
    } else {
      const failedLoginAlert = new Alert('Please enter valid data in all fields.', AlertType.Danger);
      
      
        this.loadingService.isLoading.next(false);
        this.alertService.alerts.next(failedLoginAlert);
     
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
