import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MuseumService } from '../../services/museum.service';

@Component({
  selector: 'app-museum-view',
  templateUrl: './museum-view.component.html',
  styleUrls: ['./museum-view.component.css']
})
export class MuseumViewComponent implements OnInit {

  constructor(private museumService: MuseumService, private route: ActivatedRoute, private router: Router) { }

  museum: any;
  reservations: any;


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.museumService.getMuseum(params.get('id')).subscribe((museum: any) => {
        
        this.museum = museum;
      });
      this.museumService.getReservations(params.get('id')).subscribe((reservations: any) => {
        
        this.reservations = reservations;
      })
    });
  }

  onSubmit(bankForm: NgForm){

    //bankForm.expirationDate = bankForm.value.expirationDate
    let payload = bankForm.value;
    payload.expirationDate = payload.expirationDate + '-01'
    console.log(payload);
    //this.museumService.payment(payload)
    //.subscribe(result => console.log(result));

  }

  reservation(reservation: any){
    console.log(reservation);
    this.router.navigate(['/payment', reservation.tour]);
  }

}
