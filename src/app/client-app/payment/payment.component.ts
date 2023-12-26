import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MuseumService } from 'src/app/services/museum.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private museumService: MuseumService, private route: ActivatedRoute,
              private loginService: LoginService) { }

  virtualVisitId: any;
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.virtualVisitId = params.get('id');
    });
  }

  onSubmit(bankForm: NgForm){

    //bankForm.expirationDate = bankForm.value.expirationDate
    let payload = bankForm.value;
    payload.expirationDate = payload.expirationDate + '-01';
    payload.reservationId = this.virtualVisitId;
    payload.userId = this.loginService.getToken();
    console.log(payload);
    this.museumService.payment(payload, this.loginService.getToken() , this.virtualVisitId)
    .subscribe(result => console.log(result));

  }

}
