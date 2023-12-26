import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  show: any;

  ngOnInit(): void {
    this.show = this.loginService.isLoggedIn();
  }

  logOut(){
    this.loginService.logout();
    this.show = this.loginService.isLoggedIn();
  }

}
