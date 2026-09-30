import { EventEmitter } from './base/events';


export class Catalog {

    protected element: HTMLElement;


    constructor(
        element: HTMLElement,
        protected events: EventEmitter
    ) {

        this.element = element;

    }


    render(cards: HTMLElement[]) {

        this.element.innerHTML = '';


        cards.forEach(card => {

            this.element.append(card);

        });

    }

}