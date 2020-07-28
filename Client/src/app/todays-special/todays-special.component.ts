import { Component, OnInit } from '@angular/core';
import { FoodItemModel } from "../todays-menu/foodItem.model";
import { FoodService } from '../food.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-todays-special',
  templateUrl: './todays-special.component.html',
  styleUrls: ['./todays-special.component.css']
})
export class TodaysSpecialComponent implements OnInit {
  todaysSpecial: FoodItemModel[]
  constructor(private _food: FoodService,private _auth: AuthService) { }

  ngOnInit(): void {
    this._food.getTodaysSpecial()
    .subscribe(
      res => {
        console.log(res);
        this.todaysSpecial = JSON.parse(JSON.stringify(res));
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._auth.logoutUser();
          }
        }
      }
    )
  }

}
