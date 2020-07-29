import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navbarOpen = false;
  userId: String;
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this._auth.getUserId()
    .subscribe(
      res => {
        this.userId = res['userId']
      },
      err => {
        console.log(err);        
      }
    )
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  hasAuth() {
    return this._auth.isLoggedIn();
  }

  logoutUser() {
    this._auth.logoutUser();
  }
}
