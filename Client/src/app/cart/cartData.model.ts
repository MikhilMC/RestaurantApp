export class CartItemModel {
  constructor(
    public userId: string,
    public name: string,
    public basicQuantity: number,
    public basicUnit: string,
    public basicPrice: number,
    public hasDiscount: boolean,
    public discountPercentage: number,
    public quantity: number,
    public price: number
  ) {}
}