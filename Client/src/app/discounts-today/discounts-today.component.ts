import { Component, OnInit } from '@angular/core';
import { FoodItemModel } from "../todays-menu/foodItem.model";
import { FoodService } from '../food.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-discounts-today',
  templateUrl: './discounts-today.component.html',
  styleUrls: ['./discounts-today.component.css']
})
export class DiscountsTodayComponent implements OnInit {
  discountsToday: FoodItemModel[]
  constructor(private _food: FoodService,private _auth: AuthService) { }

  ngOnInit(): void {
    this._food.getDiscountsToday()
    .subscribe(
      res => {
        console.log(res);
        this.discountsToday = JSON.parse(JSON.stringify(res));
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
