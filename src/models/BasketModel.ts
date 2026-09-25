import { ICardData } from '../components/Card';
export class BasketModel {
  private items: ICardData[] = [];

  add(product: ICardData) {

    this.items.push(product);

  }

  remove(id:string) {
    this.items = this.items.filter(item => item.id !== id);
  }

  clear() {
    this.items = [];
  }

  getItems(): ICardData[] {

    return this.items;

  }

  getTotal(): number {

    return this.items.reduce(
        (sum, item) =>
            sum + (item.price || 0),
        0
    );

  }
}
