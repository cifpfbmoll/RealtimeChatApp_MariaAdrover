import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public currentUser: any = null;
  public show: boolean = false;

  // Changes the state of the collapsible navbar, 
  // to show/hide the links and the button, by changing the value of show property
  toggleCollapse() {
    this.show = !this.show
  }

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    // AuthService sends current User object
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    })
  }
}
