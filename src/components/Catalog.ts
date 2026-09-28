import { ICardData } from './Card';
import { Card } from './Card';
import { EventEmitter } from './base/events';
export class Catalog {

    protected element: HTMLElement;


    constructor(
        element: HTMLElement,
        protected events: EventEmitter
    ) {

        this.element = element;

    }


    render(items: ICardData[]) {


        this.element.innerHTML = '';


        items.forEach(item => {

    const template =
        document.querySelector('#card-catalog') as HTMLTemplateElement;


    const cardElement =
        template.content
        .firstElementChild
        ?.cloneNode(true) as HTMLElement;


    const card =
        new Card(cardElement);


    card.render(item);


    cardElement.addEventListener(
        'click',
        () => {

            this.events.emit(
            'product:selected',
            item
        );

        }
    );


    this.element.append(cardElement);

});


    }


}