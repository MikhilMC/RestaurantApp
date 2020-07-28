import { Component, OnInit } from '@angular/core';
import { UserData } from "../signup/userdata.model";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title: string = "Login";
  loginUserData = new UserData(null, null);
  constructor(private _auth: AuthService,private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        if (res['msg'] !== undefined) {
          alert(res['msg']);
          this._router.navigateByUrl('/dummy', {skipLocationChange: true})
          .then(() => {
            this._router.navigate(['/login']);
          });
        } else {
          console.log(res);
          localStorage.setItem('token', res['token']);
          this._router.navigate(['/todays-menu']);
        }
      },
      err => {
        console.log(err);
      }
    )
  }

}
