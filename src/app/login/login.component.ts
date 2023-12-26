import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['museums']);
    }
  }


  onSubmit(loginForm: NgForm){


    this.loginService.login(loginForm.value).subscribe( {
      next: (data: any) => {

        
        let user = Object.values(data);
        this.loginService.setToken(data.userId);
        this.loginService.setAdmin(data.admin);
        if(data.admin){
          this.router.navigate(['/admin']);
        }
        else
          this.router.navigate(['/museums']);
        
      },
      error: e => {
        alert(e);
      }
    });
  }

}
