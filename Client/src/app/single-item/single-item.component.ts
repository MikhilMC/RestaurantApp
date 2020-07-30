import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FoodItemModel } from "../todays-menu/foodItem.model";
import { FoodService } from '../food.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CartItemModel } from "../cart/cartData.model";
import { CartService } from '../cart.service';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css']
})
export class SingleItemComponent implements OnInit {
  foodItem = new FoodItemModel(null, null, null, null, null, null, null, null, null, null, null, null);
  id: string;
  price: number;
  quantity: number;
  cartItem = new CartItemModel(null, null, null, null, null, null, null, null, null);
  // userId: string;
  constructor(
    private actRoute: ActivatedRoute,
    private _food: FoodService,
    private _auth: AuthService,
    private _cart: CartService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.actRoute.paramMap
    .subscribe((params) => {
      this.id = params.get('id')
    });
    this._food.getSingleProduct(this.id)
    .subscribe(
      res => {
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
  
  addToCart() {
    this._auth.getUserId()
    .subscribe(
      res => {
        this.cartItem.userId = res['userId']
        this.cartItem.name = this.foodItem.name;
        this.cartItem.basicQuantity = this.foodItem.quantity;
        this.cartItem.basicUnit = this.foodItem.unit;
        this.cartItem.basicPrice = this.foodItem.price;
        this.cartItem.quantity = this.quantity;
        this.cartItem.hasDiscount = this.foodItem.hasDiscount;
        this.cartItem.discountPercentage = this.foodItem.discountPercentage
        if (this.foodItem.hasDiscount) {
          this.cartItem.price = Math.round((this.quantity / this.foodItem.quantity) * this.foodItem.price * (this.foodItem.discountPercentage/100));
        } else {
          this.cartItem.price = Math.round((this.quantity / this.foodItem.quantity) * this.foodItem.price);
        }
        this._cart.addToCart(this.cartItem)
        .subscribe(
          res => {
            this._router.navigateByUrl('/cart/' + this.cartItem.userId);
          },
          err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this._auth.logoutUser();
              }
            }
          }
        )
      },
      err => {
        console.log(err);        
      }
    )
  }
}
