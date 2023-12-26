import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chart, registerables, ChartOptions, ChartData } from 'chart.js';
import { MuseumService } from '../services/museum.service';
declare const L: any;

@Component({
  selector: 'app-museum',
  templateUrl: './museum.component.html',
  styleUrls: ['./museum.component.css']
})
export class MuseumComponent implements OnInit {

  chart: any = [];
  lineChart: any = [];
  barChart: any = [];
  
  constructor(private museumService: MuseumService) { 

    Chart.register(...registerables);
  }
  ngOnInit(): void {

    let hours: string[] = [];
    console.log(new Date().toString());
    let currentHour = Number(new Date().toString().split(' ')[4].split(":")[0]);
    for(let i = 0; i < 25; i++) {
      hours.push(((currentHour + i) % 24 )+':00');
    }
    console.log(hours);
    let users;
    this.museumService.getUsersPerHour().subscribe(data => {
      users = data;
      console.log(users);


      this.lineChart = new Chart('lineChart', {
        type: 'line',
        data: {
            labels: hours,
            datasets: [{
                label: '# of Users',
                data: users,//[12, 19, 3, 5, 2, 3],
                borderColor: '#3e95cd',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
      });
    });

    this.museumService.getUsersCount().subscribe((data: any) => {
      
      this.lineChart = new Chart('barChart', {
        type: 'bar',
        data: {
            labels: ['Active', 'Total'],
            datasets: [{
                label: '# of Users',
                data: [data.active, data.total],
                borderColor: '#3e95cd',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
      });
    });

    this.museumService.getCountries().subscribe(data => {
      this.countries = data;
    });

    this.museumService.getToken().subscribe((data: any) => {
        this.url = 'http://localhost:8083/AdminAppJSP/?token=' + data.token;
        console.log(this.url);
    });
    

    

    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=9ogzo0uxiYMWaeoVB1Sx').addTo(this.map);
    this.marker = L.marker([51.5, -0.09]).addTo(this.map);
    
    this.latitude = 51.5;

    
  
    this.map.on('click', (e: any) => {
      
      this.marker.setLatLng(e.latlng);
      this.latitude = e.latlng.lat;
      this.longitude = e.latlng.lng;

    });
  
  }

  private name?: string;
  private address?: string; 
  private phoneNumber?: string;
  latitude?: number;
  longitude?: number;
  countries: any;
  regions: any;
  cities: any;
  selectedCountry: any;
  city: any;
  marker: any;
  map: any;
  url: any;

  onSubmit(museumForm: NgForm){

    console.log(museumForm);
    this.museumService.addMuseum(museumForm.value)
    .subscribe(result => console.log(result));
    
  }

  onSelectedCountry($event: any){;
    this.selectedCountry = $event.target.value;
    this.cities = null;
    this.museumService.getRegions($event.target.value).subscribe(data => {
      this.regions = data;
    });
  }

  onSelectedRegion($event: any){
    
    this.museumService.getCities(this.selectedCountry, $event.target.value).subscribe(data => {
      this.cities = data;
    });
  }
  onSelectedCity($event: any){
    
    this.museumService.getLatLon(this.selectedCountry, $event.target.value).subscribe(data => {
      this.city = data;
      for(let x of this.city){
        console.log(x);
        this.latitude = x.latitude;
        this.longitude = x.longitude;


        var newLatLng = new L.LatLng(this.latitude, this.longitude);
        this.marker.setLatLng(newLatLng);
        this.map.panTo(newLatLng);
      }
    });
  }

}
