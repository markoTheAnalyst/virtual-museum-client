import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MuseumService } from '../services/museum.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor(private museumService: MuseumService) { }

  museums: any;

  ngOnInit(): void {

    //.subscribe(res => { console.log(Object.values(res)[49].body) });
    
    this.museumService.getMuseums().subscribe(data => {
      this.museums = data;
    });
  }
  
  onSubmit(reservationForm: NgForm){
    this.museumService.addReservation(reservationForm.value).subscribe();
  }

  onTourSubmit(fileUpload: HTMLInputElement, video: HTMLInputElement) {

    let files = fileUpload.files;
    let formData = new FormData();

    for (let i = 0; i < files!.length; i++) {
      formData.append('files', files![i], files![i].name)
    }
    formData.append('link',video.value);
    this.museumService.upload(formData).subscribe();
  }
}
