import './scss/styles.scss';
import { Basket } from './components/Basket';
import { EventEmitter } from './components/base/events';
import { Api } from './components/base/api';
import { CardPreview } from './components/CardPreview';
import { ProductsModel } from './models/ProductsModel';
import { BasketModel } from './models/BasketModel';
import { OrderModel } from './models/OrderModel';
import { Modal } from './components/Modal';
import { AppPresenter } from './presenters/AppPresenter';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
const events = new EventEmitter();

const api = new Api(
    'https://larek-api.nomoreparties.co/api/weblarek'
);


const productsModel = new ProductsModel();

const basketModel = new BasketModel();

const orderModel = new OrderModel();


import { Catalog } from './components/Catalog';


const gallery = document.querySelector('.gallery') as HTMLElement;

const catalog = new Catalog(
    gallery,
    (product) => {

        const template =
        document.querySelector('#card-preview') as HTMLTemplateElement;


        const preview =
            template.content
            .firstElementChild
            ?.cloneNode(true) as HTMLElement;


        const cardPreview =
            new CardPreview(
                preview,
                () => {

                    basketModel.add(product);
                    updateBasketCounter();
                   
                }
            );


        modal.open(
            cardPreview.render(product)
        );

    }
);
const modalContainer =
    document.querySelector('#modal-container') as HTMLElement;

const modal = new Modal(modalContainer);
const basketTemplate =
    document.querySelector('#basket') as HTMLTemplateElement;


const basketElement =
    basketTemplate.content
    .firstElementChild
    ?.cloneNode(true) as HTMLElement;


const basket = new Basket(
    basketElement,

    (id) => {

        basketModel.remove(id);

        updateBasketCounter();

        modal.open(
            basket.render(
                basketModel.getItems()
            )
        );

    },

    () => {

    const template =
        document.querySelector('#order') as HTMLTemplateElement;


    const orderElement =
        template.content
        .firstElementChild
        ?.cloneNode(true) as HTMLElement;


    const order =
    new Order(
        orderElement,
        (data)=>{

    if(data.next){

        const template =
            document.querySelector(
                '#contacts'
            ) as HTMLTemplateElement;


        const contactsElement =
            template.content
            .firstElementChild
            ?.cloneNode(true) as HTMLElement;


        const contacts =
            new Contacts(
                contactsElement,
                contactsData => {


    if(contactsData.submit){


        api.post(
        '/order',
        {
            ...orderModel.data,

            items:
                basketModel.getItems()
                .map(item => item.id),

            total:
                basketModel.getTotal()
        }
    )
        .then((result)=>{
            const total =
                basketModel.getTotal();


            


            basketModel.clear();
            updateBasketCounter();
            orderModel.clear();


            const template =
                document.querySelector(
                    '#success'
                ) as HTMLTemplateElement;


            const success =
                template.content
                .firstElementChild
                ?.cloneNode(true) as HTMLElement;


            
            const description =
                success.querySelector(
                    '.order-success__description'
                );


            if(description) {

                description.textContent =
                    `Списано ${total} синапсов`;

            }
            const closeButton =
                success.querySelector('.order-success__close');


            closeButton?.addEventListener(
                'click',
                () => {

                    modal.close();

                }
            );
            modal.open(success);
        });


        return;

    }


    orderModel.setData(
        contactsData
    );


   

}
            );


        modal.open(
            contacts.render()
        );


        return;

    }


    orderModel.setData(data);


   

}
    );


    modal.open(
        order.render()
    );

}
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
const presenter = new AppPresenter(
    events,
    api,
    productsModel,
    basketModel,
    orderModel,
    catalog
);
const basketButton =
    document.querySelector('.header__basket');


basketButton?.addEventListener(
    'click',
    () => {

        modal.open(
            basket.render(
                basketModel.getItems()
            )
        );

    }
);
presenter.init();