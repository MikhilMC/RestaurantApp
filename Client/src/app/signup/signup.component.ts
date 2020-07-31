import { Component, OnInit } from '@angular/core';
import { UserData } from "./userdata.model";
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupUserData = new UserData(null, null);
  title: string = "Signup";
  constructor(private _auth:AuthService,private _router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  signupUser() {
    this._auth.signupUser(this.signupUserData)
    .subscribe(
      res => {
        if (res['msg'] !== undefined) {
          alert(res['msg']);
          this._router.navigateByUrl('/dummy', {skipLocationChange: true})
          .then(() => {
            this._router.navigate(['/signup']);
          })
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
