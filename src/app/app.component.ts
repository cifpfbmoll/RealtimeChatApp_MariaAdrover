import { Component, OnInit } from '@angular/core';
import { AlertService } from './services/alert.service';
import { Alert } from './classes/alert';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public alerts: Array<Alert> = [];
  private subscriptions: Subscription[] = [];
  public loading: boolean = false;

  // When initialized, it gets from parameter an AlertService object...
  // ...and LoadingService object
  constructor(
    private alertService: AlertService, 
    private loadingService: LoadingService
    ) { }

  // Adds Subscription objects to subscrptions property...
  ngOnInit() {
    // ...one Subscription to add Alert objects to the array of Alerts
    // Alert object is get from AlertService of the constructor parameter alertService
    this.subscriptions.push(
      this.alertService.alerts.subscribe(alert => {
        this.alerts.push(alert);
      })
    )

    // ...one Subscription to change the value of boolean loading property
    // loading property changes it's value from LoadingService of the constructor parameter loadingService
    this.subscriptions.push(
      this.loadingService.isLoading.subscribe(isLoading => {
        this.loading = isLoading;
      })
    )
  }
}

