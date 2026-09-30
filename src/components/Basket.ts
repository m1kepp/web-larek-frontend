import { EventEmitter } from './base/events';

export class Basket {

    protected element: HTMLElement;


    constructor(
        element: HTMLElement,
        protected events: EventEmitter
    ) {

        this.element = element;

    }


    render(
        cards: HTMLElement[],
        total: number
    ) {

        const list =
            this.element.querySelector(
                '.basket__list'
            );


        const price =
            this.element.querySelector(
                '.basket__price'
            );


        const button =
            this.element.querySelector(
                '.basket__button'
            ) as HTMLButtonElement; 

        if (!list || !price) {
            return this.element;
        }


        list.innerHTML = '';


        cards.forEach(card => {

            list.append(card);

        });



        price.textContent =
            `${total} синапсов`;


        if (button) {

            button.disabled =
                cards.length === 0;


            button.onclick = () => {

                if (cards.length === 0) {
                    return;
                }


                this.events.emit(
                    'order:start'
                );

            };

        }


        return this.element;

    }

}