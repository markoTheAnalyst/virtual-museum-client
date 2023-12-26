import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private http: HttpClient) {}
  loggedIn: any

  setToken(token: any): void {
    localStorage.setItem('token', token);
    console.log(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setAdmin(admin: any): void {
    localStorage.setItem('admin', admin);
    console.log(admin);
  }

  getAdmin(): string | null {
    return  localStorage.getItem('admin');
  }

  isLoggedIn() {
    this.loggedIn = this.getToken() != null;
    return this.loggedIn;
  }

  isAdmin() {
    return this.getAdmin();
  }

  logout() { 
    this.http.post('http://localhost:8080/logout', this.getToken(), {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe();
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.loggedIn = false;
    this.router.navigate(['home']);
  }

  login(credentials: any) {
    return this.http.post('http://localhost:8080/login', credentials);
  }
}
