import { Component, OnInit } from '@angular/core';
import { CartItemModel } from "../cart/cartData.model";
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-cart',
  templateUrl: './edit-cart.component.html',
  styleUrls: ['./edit-cart.component.css']
})
export class EditCartComponent implements OnInit {
  title: string = "Edit Cart Item"
  id: string;
  oldCartItem = new CartItemModel(null,null,null,null,null,null,null,null,null);
  newCartItem = {quantity: 0, price: 0};
  constructor(
    public actRoute: ActivatedRoute,
    public _cart: CartService,
    public _auth: AuthService,
    public _router: Router
  ) { }

  ngOnInit(): void {
    this.actRoute.paramMap
    .subscribe((params) => {
      this.id = params.get('id');
    });
    this._cart.getCartItem(this.id)
    .subscribe(
      res => {
        // console.log(res);
        this.oldCartItem = JSON.parse(JSON.stringify(res));
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

  editCartItem() {
    if (this.oldCartItem.hasDiscount) {
      this.newCartItem.price = (this.newCartItem.quantity / this.oldCartItem.quantity) * this.oldCartItem.price * (this.oldCartItem.discountPercentage/100);
    } else {
      this.newCartItem.price = (this.newCartItem.quantity / this.oldCartItem.quantity) * this.oldCartItem.price;
    }
    if (this.newCartItem.quantity === 0) {
      this._router.navigate(['/cart', this.oldCartItem.userId]);
    } else {
      this._cart.editCartItem(this.id, this.newCartItem)
      .subscribe(
        res => {
          this._router.navigate(['/cart', this.oldCartItem.userId]);
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
}
