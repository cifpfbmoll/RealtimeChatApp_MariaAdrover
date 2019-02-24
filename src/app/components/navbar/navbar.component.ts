import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public currentUser: any = null;
  //isCollapsed = true;prueba navbar

  public show:boolean = false;//prueba2
  toggleCollapse() {
    this.show = !this.show
  }

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    // La autenticacion manda el user actual
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    })
  }

}
