import { ICardData } from './Card';
export class Basket {

    protected element: HTMLElement;
    protected onRemove?: (id:string)=>void;
    protected onOrder?: () => void;
    constructor(
    element: HTMLElement,
    onRemove?: (id:string)=>void,
    onOrder?: ()=>void
) {

    this.element = element;
    this.onRemove = onRemove;
    this.onOrder = onOrder;


    const orderButton =
        this.element.querySelector('.basket__button');


    orderButton?.addEventListener(
        'click',
        () => {
            this.onOrder?.();
        }
    );
}


    render(items: ICardData[]) {

        const list =
            this.element.querySelector('.basket__list');


        const price =
            this.element.querySelector('.basket__price');


        if (list) {

            list.innerHTML = '';

            items.forEach(
                (item, index) => {

                    const li =
                        document.createElement('li');

                    li.className =
                        'basket__item card card_compact';


                    li.innerHTML = `
                        <span class="basket__item-index">
                            ${index + 1}
                        </span>

                        <span class="card__title">
                            ${item.title}
                        </span>

                        <span class="card__price">
                            ${item.price} синапсов
                        </span>

                        <button 
                            class="basket__item-delete"
                            aria-label="удалить">
                        </button>
                    `;

                    const deleteButton =
                        li.querySelector('.basket__item-delete');


                    deleteButton?.addEventListener(
                        'click',
                        () => {

                            this.onRemove?.(item.id);

                        }
                    );
                    list.appendChild(li);

                }
            );
        }

        
        if (price) {

            const total =
            items.reduce(
                (sum, item) =>
                    sum + (item.price ?? 0),
                0
            );
        }


        return this.element;
    }
}