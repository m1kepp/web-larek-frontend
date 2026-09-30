import { ICardData } from './Card';
import { EventEmitter } from './base/events';


export class Basket {

    protected element: HTMLElement;


    constructor(
        element: HTMLElement,
        protected events: EventEmitter
    ) {

        this.element = element;

    }


    render(items: ICardData[]) {

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


        items.forEach(
            (item, index) => {


                const template =
                    document.querySelector(
                        '#card-basket'
                    ) as HTMLTemplateElement;


                const card =
                    template.content
                    .firstElementChild
                    ?.cloneNode(true) as HTMLElement;


                const title =
                    card.querySelector(
                        '.card__title'
                    );


                const itemPrice =
                    card.querySelector(
                        '.card__price'
                    );


                const number =
                    card.querySelector(
                        '.basket__item-index'
                    );


                const deleteButton =
                    card.querySelector(
                        '.basket__item-delete'
                    );


                if (title) {
                    title.textContent = item.title;
                }


                if (itemPrice) {
                    itemPrice.textContent =
                        `${item.price ?? 0} синапсов`;
                }


                if (number) {
                    number.textContent =
                        String(index + 1);
                }


                deleteButton?.addEventListener(
                    'click',
                    () => {

                        this.events.emit(
                            'basket:remove',
                            {
                                id: item.id
                            }
                        );

                    }
                );


                list.append(card);

            }
        );


        const total =
            items.reduce(
                (sum, item) =>
                    sum + (item.price ?? 0),
                0
            );


        price.textContent =
            `${total} синапсов`;


        if (button) {

            button.disabled =
                items.length === 0;


            button.onclick = () => {

                if (items.length === 0) {
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