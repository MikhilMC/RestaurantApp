import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private getCartUrl = "http://localhost:5000/api/cart/";
  private addToCartUrl = "http://localhost:5000/api/add-to-cart"
  private getCartItemUrl = "http://localhost:5000/api/cart-item/";
  constructor(private http: HttpClient) { }

  getCart(id) {
    return this.http.get(this.getCartUrl + id);
  }

  addToCart(item) {
    return this.http.post(this.addToCartUrl, item);
  }

  getCartItem(id) {
    return this.http.get(this.getCartItemUrl + id);
  }

  editCartItem(id, data) {
    return this.http.patch(this.getCartItemUrl + id, data)
  }

  deleteCartItem(id) {
    return this.http.delete(this.getCartItemUrl + id);
  }
}
