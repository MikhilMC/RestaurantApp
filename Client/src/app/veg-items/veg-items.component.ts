import { Component, OnInit } from '@angular/core';
import { FoodItemModel } from "../todays-menu/foodItem.model";
import { FoodService } from '../food.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-veg-items',
  templateUrl: './veg-items.component.html',
  styleUrls: ['./veg-items.component.css']
})
export class VegItemsComponent implements OnInit {
  vegItems: FoodItemModel[]
  constructor(private _food: FoodService,private _auth: AuthService) { }

  ngOnInit(): void {
    this._food.getVegItems()
    .subscribe(
      res => {
        console.log(res);
        this.vegItems = JSON.parse(JSON.stringify(res));
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
