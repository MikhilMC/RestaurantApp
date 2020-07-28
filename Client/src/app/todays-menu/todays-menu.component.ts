import { Component, OnInit } from '@angular/core';
import { FoodItemModel } from "./foodItem.model";
import { FoodService } from '../food.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-todays-menu',
  templateUrl: './todays-menu.component.html',
  styleUrls: ['./todays-menu.component.css']
})
export class TodaysMenuComponent implements OnInit {

  todaysMenu: FoodItemModel[]
  constructor(private _food: FoodService,private _auth: AuthService) { }

  ngOnInit(): void {
    this._food.getTodaysMenu()
    .subscribe(
      res => {
        console.log(res);
        this.todaysMenu = JSON.parse(JSON.stringify(res));
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._auth.logoutUser();
          }
        }
      }
    );
  }

}
