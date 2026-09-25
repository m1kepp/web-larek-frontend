import { ICardData } from '../components/Card';
export class ProductsModel {
  private products: ICardData[] = [];

  setProducts(products: ICardData[]) {

    this.products = products;

  }

  getProducts(): ICardData[] {

    return this.products;

  }

  getProduct(id:string): ICardData | undefined {

    return this.products.find(
        item => item.id === id
    );

  }
}
