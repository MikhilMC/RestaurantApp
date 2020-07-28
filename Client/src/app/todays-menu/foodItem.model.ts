export class FoodItemModel {
  constructor(
    public name: string,
    public isItVeg: boolean,
    public measurement: string,
    public quantity: number,
    public unit: string,
    public price: number,
    public imageURL: string,
    public hasDiscount: boolean,
    public discountPercentage: number,
    public isSpecialToday: boolean,
    public quantityToday: number,
    public soldQuantity: number
  ){}
}