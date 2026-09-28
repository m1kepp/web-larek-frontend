import { ICardData } from '../components/Card';
import { EventEmitter } from '../components/base/events';
export class ProductsModel {

    private products: ICardData[] = [];


    constructor(
        private events: EventEmitter
    ) {}


    setProducts(products: ICardData[]) {

        this.products = products;


        this.events.emit(
            'products:changed',
            this.products
        );

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