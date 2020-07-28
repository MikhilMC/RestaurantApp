import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signupUrl = "http://localhost:5000/api/signup";
  private loginUrl = "http://localhost:5000/api/login";
  constructor(private http: HttpClient,private _router:Router) { }

  signupUser(user) {
    return this.http.post(this.signupUrl, user);
  }

  loginUser(user) {
    return this.http.post(this.loginUrl, user);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
