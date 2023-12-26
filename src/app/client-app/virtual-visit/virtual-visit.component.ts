import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { MuseumService } from 'src/app/services/museum.service';

@Component({
  selector: 'app-virtual-visit',
  templateUrl: './virtual-visit.component.html',
  styleUrls: ['./virtual-visit.component.css']
})
export class VirtualVisitComponent implements OnInit {

  visits: any;

  images: any;
  imageurl = "http://localhost:8080/download/";

  constructor(private museumService: MuseumService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.museumService.getVisits(this.loginService.getToken()).subscribe((bookings: any) => {
      this.visits = bookings;

      console.log(this.visits);
      console.log('-----------');
      this.visits = this.visits.filter((elem: any, index: any) => this.visits.findIndex((obj: any) => obj.reservation === elem.reservation) === index);
      console.log(this.visits);

      for(let i = 0; i < this.visits.length; i++) {

        this.museumService.getReservation(this.visits[i].reservation).subscribe((reservation: any) => {
          this.visits[i] = reservation;

          let date = new Date(this.visits[i].startingTime);
          date.setTime(date.getTime() + this.visits[i].duration * 60 * 60 * 1000);
          console.log(date);

          this.visits[i].endingTime = date;


          this.museumService.getMuseum(reservation.museum).subscribe((museum: any) => {
            this.visits[i].museumName = museum.name;
          })
        })
      }
        
    });

    
  }
}
