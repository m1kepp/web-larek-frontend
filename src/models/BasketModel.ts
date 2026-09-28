import { ICardData } from '../components/Card';
import { EventEmitter } from '../components/base/events';


export class BasketModel {

    private items: ICardData[] = [];


    constructor(
        private events: EventEmitter
    ) {}


    add(product: ICardData) {

        const exists =
            this.items.some(
                item => item.id === product.id
            );


        if (!exists) {

            this.items.push(product);

        }


        this.events.emit(
            'basket:changed',
            this.items
        );

    }


    remove(id: string) {

        this.items =
            this.items.filter(
                item => item.id !== id
            );


        this.events.emit(
            'basket:changed',
            this.items
        );

    }


    getItems(): ICardData[] {

        return this.items;

    }
    clear() {

        this.items = [];


        this.events.emit(
            'basket:changed',
            this.items
        );

    }
getTotal() {

    console.log(
        'TOTAL:',
        this.items
    );

    return this.items.reduce(
        (sum, item) =>
            sum + (item.price ?? 0),
        0
    );

}
}
