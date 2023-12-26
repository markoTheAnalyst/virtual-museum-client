import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MuseumService } from '../services/museum.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private museumService : MuseumService, private loginService  : LoginService, private router: Router) { }

  ngOnInit(): void {

        if(this.loginService.isLoggedIn()){
          this.router.navigate(['/museums']);
        }
  }

  show = false;


  onSubmit(registration: NgForm){

    console.log(registration);
    this.museumService.register(registration.value)
    .subscribe({
      next: (data: any) => {

        
        // let user = Object.values(data);
        // this.loginService.setToken(data.userId);
        // if(data.admin){
        //   this.router.navigate(['/admin']);
        // }
        // else
        //   this.router.navigate(['/museums']);
        
      },
      error: e => {
        this.show = true;
      }
    });
    
  }

}
