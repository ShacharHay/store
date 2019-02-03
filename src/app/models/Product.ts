export class Product {
  public _id: any;
  public name: string;
  public description: string;
  public imageUrl: string;
  public price: number;
  public categories: string[];

  constructor() {
    this.categories = [];
  }
}
