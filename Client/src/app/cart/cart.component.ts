import { Component, OnInit } from '@angular/core';
import { CartItemModel } from "./cartData.model";
import { ActivatedRoute, Router } from '@angular/router';
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
  totalCost: number = 0;
  units = new Array();
  discount = new Array();
  constructor(
    private actRoute: ActivatedRoute,
    private _cart: CartService,
    private _auth:AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.actRoute.paramMap
    .subscribe((params) => {
      this.userId = params.get('id');
    });
    this._cart.getCart(this.userId)
    .subscribe(
      res => {
        if (res['msg'] !== undefined) {
          this.hasAny = false
        } else {
          this.hasAny = true
          this.cartItems = JSON.parse(JSON.stringify(res));
          // console.log(this.cartItems);
          this.cartItems.forEach(cartItem => {
            if (cartItem.basicUnit === 'number') {
              if (cartItem.quantity > cartItem.basicQuantity) {
                this.units.push("no's.");
              } else {
                this.units.push("no.");
              }
            } else {
              this.units.push("grams");
            }
            this.discount.push(Math.floor(100 - cartItem.discountPercentage));
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

  deleteCartItem(id) {
    this._cart.deleteCartItem(id)
    .subscribe(
      res => {
        // console.log(res);
        alert('Food item deleted from the cart');
        this.reloadCart();
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

  clearCart() {
    this._cart.clearCart(this.userId)
    .subscribe(
      res => {
        console.log(res)
        // this._router.navigate(['/todays-menu']);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._auth.logoutUser();
          }
        }
      }
    );
    setTimeout(() => {
      this.reloadCart();
    }, 500);
  }

  reloadCart() {
    this._router.navigateByUrl('/dummy', {skipLocationChange: true})
    .then(() => {
      this._router.navigate(['/cart', this.userId]);
    });
  }
}
