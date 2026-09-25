import { ICardData } from './Card';
import { Card } from './Card';

export class Catalog {


    constructor(
        protected container: HTMLElement,
        protected onSelect?: (product: ICardData)=>void
    ) {}


    render(items: ICardData[]) {


        this.container.innerHTML = '';


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

            this.onSelect?.(item);

        }
    );


    this.container.append(cardElement);

});


    }


}