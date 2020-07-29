import { Component, OnInit } from '@angular/core';
import { CartItemModel } from "./cartData.model";
import { ActivatedRoute } from '@angular/router';
import { CartService } from "../cart.service";
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  title: string = "Cart";
  cartItems: CartItemModel[];
  userId: string;
  hasAny: boolean;
  totalCost: number = 0
  constructor(private actRoute: ActivatedRoute,private cart: CartService, private _auth:AuthService) { }

  ngOnInit(): void {
    this.actRoute.paramMap
    .subscribe((params) => {
      this.userId = params.get('id');
    });
    this.cart.getCart(this.userId)
    .subscribe(
      res => {
        if (res['msg'] !== undefined) {
          this.hasAny = false
        } else {
          this.hasAny = true
          this.cartItems = JSON.parse(JSON.stringify(res));
          this.cartItems.forEach(cartItem => {
            this.totalCost += cartItem.price;
          })
        }
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
