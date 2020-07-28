import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FoodItemModel } from "../todays-menu/foodItem.model";
import { FoodService } from '../food.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css']
})
export class SingleItemComponent implements OnInit {
  foodItem = new FoodItemModel(null, null, null, null, null, null, null, null, null, null, null, null);
  id: String;
  price: Number;
  quantity: Number;
  constructor(private actRoute: ActivatedRoute,private _food: FoodService,private _auth:AuthService) { }

  ngOnInit(): void {
    this.actRoute.paramMap
    .subscribe((params) => {
      this.id = params.get('id')
    });
    this._food.getSingleProduct(this.id)
    .subscribe(
      res => {
        console.log(res);
        this.foodItem = JSON.parse(JSON.stringify(res));
        this.price = this.foodItem.price;
        this.quantity = this.foodItem.quantity;
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

  onKey(event: any) {
    if (this.foodItem.measurement === 'weight') {
      this.price = (event.target.value/this.foodItem.quantity) * this.foodItem.price;
    } else {
      this.price = event.target.value * this.foodItem.price;
    }
  }
}
