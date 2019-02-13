import { Component, OnInit } from '@angular/core';
import { AlertService } from './services/alert.service';
import { Alert } from './classes/alert';
import { LoadingService } from './services/loading.service';
import {  Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public alerts: Array<Alert> = [];
  private subscriptions: Subscription[] = [];
  public loading: boolean = false;

  constructor(private alertService: AlertService, private loadingService: LoadingService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.alertService.alerts.subscribe(alert => {
        this.alerts.push(alert);
      })
    )

    this.subscriptions.push(
      this.loadingService.isLoading.subscribe(isLoading => {
        this.loading = isLoading;
      })
    )
  }
}

