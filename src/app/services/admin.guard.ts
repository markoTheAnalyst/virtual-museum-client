import { Injectable } from '@angular/core';
import { CanActivate, Router,  } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {}
  canActivate(): boolean {

    console.log(this.loginService.isAdmin());
    console.log(this.loginService.getAdmin());
    if (this.loginService.isAdmin() != 'false') {

      return true;
    }
    else{
      this.router.navigate(['home']);
      return false;
    }
  }
  
}
