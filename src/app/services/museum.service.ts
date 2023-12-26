import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';


const cors = 'https://cors-anywhere.herokuapp.com/';
const key = 'f56ea8e1e2ad97b5985aac596232bd11';
const localhost = 'http://localhost:8080/';
const bank = 'http://localhost:8081/';

@Injectable({
  providedIn: 'root'
})
export class MuseumService {
  
  
  constructor(private http : HttpClient, private loginService : LoginService) { }

  public test() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
    //return fetch('http://battuta.medunes.net/api/region/fr/all/?key='+key);
  }

  public addMuseum(museum: any) {
    return this.http.post(localhost+'museums', museum);
  }

  public payment(paymentData: any, userId: any, reservationId: any) {
    return this.http.post(bank+'payment?reservationId='+reservationId+'&userId='+userId, paymentData);
  }

  public addReservation(reservation: any) {
    return this.http.post(localhost+'reservations', reservation);
  }

  public upload(body: any) {
    return this.http.post(localhost+'upload', body);
  }

  getVisits(id: any) {
    return this.http.get(localhost+'bookings/'+id);
  }

  public getMuseums() {
    return this.http.get(localhost+'museums');
  }

  public getMuseum(id: any) {
    return this.http.get(localhost+'museums/'+id);
  }

  public getReservations(id: any) {
    return this.http.get(localhost+'reservations/'+id);
  }

  public getReservation(id: any) {
    return this.http.get(localhost+'reservation/'+id);
  }

  public getCountries() {
    return this.http.get('https://restcountries.com/v3.1/region/europe');
  }
  public getRegions(country: string) {

    return this.http.get(cors+'http://battuta.medunes.net/api/region/'+country+'/all/?key='+key);
  }
  public getCities(country:string, region: string) {

    return this.http.get(cors+'https://battuta.medunes.net/api/city/'+country+'/search/?region='+region+'&key='+key);
  }

  public getLatLon(country:string, city: string) {

    return this.http.get(cors+'http://battuta.medunes.net/api/city/'+country+'/search/?city='+city+'&key='+key);
  }

  public async getWeatherForecast(country:string) {
    let regions;
    let region: string; 
  
    let response = await fetch(cors+'http://battuta.medunes.net/api/region/'+country+'/all/?key='+key)
    regions = await response.json();

    if(country == 'BA'){
      regions.splice(0,1);
    }
    
    let index = Math.floor(Math.random() * regions.length);
    region = regions[index].region;

    response = await fetch(cors+'https://battuta.medunes.net/api/city/'+country+'/search/?region='+region+'&key='+key)
    let cities = await response.json();
    console.log(cities);
    index = Math.floor(Math.random() * cities.length);
    let city = cities[index];
    return city;
  }

  getImages(id: any){
    return this.http.get(localhost+'count/'+id);
  }

  getToken() {
    return this.http.get(localhost+'token/'+this.loginService.getToken());
  }

  getVideo(id: any) {
    return this.http.get(localhost+'download/video/'+id);
  }

  getUsersPerHour() {
    return this.http.get(localhost+'hours');
  }

  getUsersCount() {
    return this.http.get(localhost+'user-count');
  }

  register(account: any) {
    return this.http.post(localhost+'register', account);
  }
}
