import { Component, OnInit } from '@angular/core';
import { CartItemModel } from "../cart/cartData.model";
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { TimeTable } from "./timeTable.model";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  title: string = "CHECK OUT";
  subTitle: string = "ORDER"
  cartItems: CartItemModel[];
  userId: string;
  totalCost: number = 0;
  discount = new Array();
  timeTable: TimeTable[];
  time = new Array();
  timeFrame: string;
  constructor(
    private actRoute: ActivatedRoute,
    private _cart: CartService,
    private _auth:AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.actRoute.paramMap
    .subscribe((param) => {
      this.userId = param.get('id');
    });
    
    this._cart.getCart(this.userId)
    .subscribe(
      res => {
        this.cartItems = JSON.parse(JSON.stringify(res))
        // console.log(this.cartItems);
        this.cartItems.forEach((item)=> {
          if (item.hasDiscount) {
            this.discount.push(Math.floor(100 - item.discountPercentage))
          } else {
            this.discount.push(0);
          }
          this.totalCost += item.price;
        });
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._auth.logoutUser();
          }
        }
      }
    );

    this._cart.getTimeTable()
    .subscribe(
      res => {
        this.timeTable = JSON.parse(JSON.stringify(res))
        // console.log(this.timeTable);
        this.createTimeTableStrings();
        // console.log(this.time);
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

  createTimeTableStrings() {
    this.timeTable.forEach((period) => {
      if (!period.hasClosed) {
        let t = "";
        if ((period.start.hour - 12) < 10) {
          t += ('0' +(period.start.hour - 12) + ':')
        } else {
          t += ((period.start.hour - 12) + ':')
        }

        if (period.start.minute < 10) {
          t += ('0' + period.start.minute + 'pm - ')
        } else {
          t += (period.start.minute + 'pm - ')
        }

        if ((period.end.hour - 12) < 10) {
          t += ('0' +(period.end.hour - 12) + ':')
        } else {
          t += ((period.end.hour - 12) + ':')
        }

        if (period.end.minute < 10) {
          t += ('0' + period.end.minute + 'pm')
        } else {
          t += (period.end.minute + 'pm')
        }

        this.time.push(t);
      }
    })
  }

  checkOut() {
    // console.log(this.timeFrame)
    // console.log(this.cartItems);
    // console.log(this.totalCost);
    let items = [];
    this.cartItems.forEach((item) => {
      items.push({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })
    });
    this._cart.checkOut(this.userId, this.timeFrame, items)
    .subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/todays-menu']);
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
