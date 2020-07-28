import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private todaysMenuUrl = "http://localhost:5000/api/todays-menu";
  private discountsTodayUrl = "http://localhost:5000/api/discounts-today";
  private todaysSpecialUrl = "http://localhost:5000/api/todays-special";
  private vegItemsUrl = "http://localhost:5000/api/veg-items";
  private singleItemUrl = "http://localhost:5000/api/food-item/";
  constructor(private http: HttpClient) { }

  getTodaysMenu() {
    return this.http.get(this.todaysMenuUrl);
  }

  getDiscountsToday() {
    return this.http.get(this.discountsTodayUrl);
  }

  getTodaysSpecial() {
    return this.http.get(this.todaysSpecialUrl);
  }

  getVegItems() {
    return this.http.get(this.vegItemsUrl);
  }

  getSingleProduct(id) {
    return this.http.get(this.singleItemUrl + id);
  }
}
