import './scss/styles.scss';
import { Basket } from './components/Basket';
import { EventEmitter } from './components/base/events';
import { Api } from './components/base/api';
import { CardPreview } from './components/CardPreview';
import { ProductsModel } from './models/ProductsModel';
import { BasketModel } from './models/BasketModel';
import { OrderModel } from './models/OrderModel';
import { Modal } from './components/Modal';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { ICardData, Card } from './components/Card';
import { IOrderData } from './models/OrderModel';
const events = new EventEmitter();

const api = new Api(
    'https://larek-api.nomoreparties.co/api/weblarek'
);


const productsModel = new ProductsModel(events);

const basketModel = new BasketModel(events);
events.on(
    'basket:add',
    (product: ICardData) => {

        basketModel.add(product);

    }
);
events.on(
    'basket:remove',
    (event) => {

        basketModel.remove(
            (event as { id: string }).id
        );

    }
);

const orderModel = new OrderModel(events);
events.on(
    'order:change',
    (data) => {

        orderModel.setData(
            data as Partial<IOrderData>
        );

    }
);


events.on(
    'contacts:change',
    (data) => {

        orderModel.setData(
            data as Partial<IOrderData>
        );

    }
);
events.on(
    'contacts:submit',
    () => {


        const total =
            basketModel.getTotal();


        api.post(
            '/order',
            {
                ...orderModel.data,

                items:
                    basketModel.getItems().map(
                        item => item.id
                    ),

                total

            }
        )
        .then(() => {

            const total =
                basketModel.getTotal();


            const successTemplate =
                document.querySelector(
                    '#success'
                ) as HTMLTemplateElement;


            const successElement =
                successTemplate.content
                .firstElementChild
                ?.cloneNode(true) as HTMLElement;
            const successButton =
                successElement.querySelector(
                    '.order-success__close'
                );


            successButton?.addEventListener(
                'click',
                () => {

                    events.emit(
                        'success:close'
                    );

                }
            );    

            const totalElement =
                successElement.querySelector(
                    '.order-success__description'
                );


            if (totalElement) {

                totalElement.textContent =
                    `Списано ${total} синапсов`;

            }


            modal.open(
                successElement
            );


            basketModel.clear();

        });

    }
);
events.on(
    'order:next',
    () => {

        modal.open(
            contacts.render()
        );

    }
);
events.on(
    'success:close',
    () => {

        modal.close();

    }
);

import { Catalog } from './components/Catalog';


const gallery = document.querySelector('.gallery') as HTMLElement;

const catalog = new Catalog(
    gallery,
    events
);
const modalContainer =
    document.querySelector('#modal-container') as HTMLElement;

const modal = new Modal(modalContainer);
events.on(
    'product:selected',
    (product) => {

        const template =
            document.querySelector(
                '#card-preview'
            ) as HTMLTemplateElement;


        const preview =
            template.content
            .firstElementChild
            ?.cloneNode(true) as HTMLElement;


        const cardPreview =
            new CardPreview(
                preview,
                events
            );


        modal.open(
            cardPreview.render(
                product as ICardData
            )
        );

    }
);

const basketTemplate =
    document.querySelector('#basket') as HTMLTemplateElement;


const basketElement =
    basketTemplate.content
    .firstElementChild
    ?.cloneNode(true) as HTMLElement;


const basket = new Basket(
    basketElement,
    events
);
function createBasketCards(): HTMLElement[] {

    return basketModel.getItems()
        .map((item, index) => {

            const template =
                document.querySelector(
                    '#card-basket'
                ) as HTMLTemplateElement;


            const card =
                template.content
                .firstElementChild
                ?.cloneNode(true) as HTMLElement;


            const title =
                card.querySelector('.card__title');


            const itemPrice =
                card.querySelector('.card__price');


            const number =
                card.querySelector('.basket__item-index');


            const deleteButton =
                card.querySelector('.basket__item-delete');


            if (title) {
                title.textContent =
                    item.title;
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

                    events.emit(
                        'basket:remove',
                        {
                            id: item.id
                        }
                    );

                }
            );


            return card;

        });

}


const orderTemplate =
    document.querySelector('#order') as HTMLTemplateElement;


const orderElement =
    orderTemplate.content
    .firstElementChild
    ?.cloneNode(true) as HTMLElement;


const order = new Order(
    orderElement,
    events
);
events.on(
    'order:start',
    () => {

        modal.open(
            order.render()
        );

    }
);
const contactsTemplate =
    document.querySelector('#contacts') as HTMLTemplateElement;


const contactsElement =
    contactsTemplate.content
    .firstElementChild
    ?.cloneNode(true) as HTMLElement;


const contacts = new Contacts(
    contactsElement,
    events
);
const basketCounter =
    document.querySelector('.header__basket-counter');


function updateBasketCounter() {

    if (basketCounter) {

        basketCounter.textContent =
            String(
                basketModel.getItems().length
            );

    }

}
events.on(
    'basket:changed',
    () => {

        updateBasketCounter();

        basket.render(
            createBasketCards(),
            basketModel.getTotal()
        );

    }
);
const basketButton =
    document.querySelector('.header__basket');


basketButton?.addEventListener(
    'click',
    () => {

        modal.open(
            basket.render(
            createBasketCards(),
            basketModel.getTotal()
        )
        );

    }
);
api.get('/product')
    .then((data: any) => {


        productsModel.setProducts(
            data.items
        );


        const cards =
    data.items.map((item: ICardData) => {

        const template =
            document.querySelector(
                '#card-catalog'
            ) as HTMLTemplateElement;


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

                events.emit(
                    'product:selected',
                    item
                );

            }
        );


        return cardElement;

    });


catalog.render(cards);


        events.emit(
            'products:loaded',
            data.items
        );


    })
    .catch((error) => {

        console.error(
            'Products loading error:',
            error
        );

    });
