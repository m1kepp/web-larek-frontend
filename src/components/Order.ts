import { IOrderData } from '../models/OrderModel';
import { EventEmitter } from './base/events';


type OrderChange = Partial<IOrderData> & {
    next?: boolean;
};


export class Order {

    protected element: HTMLElement;
    protected events: EventEmitter;


    constructor(
        element: HTMLElement,
        events: EventEmitter
    ) {

        this.element = element;
        this.events = events;


        const nextButton =
            this.element.querySelector(
                '.order__button'
            ) as HTMLButtonElement;


        nextButton?.addEventListener(
            'click',
            () => {

                this.events.emit(
                    'order:next',
                    {
                        next: true
                    }
                );

            }
        );


        const buttons =
            this.element.querySelectorAll(
                '.button_alt'
            );


        buttons.forEach(button => {

            button.addEventListener(
                'click',
                () => {


                    buttons.forEach(btn =>
                        btn.classList.remove(
                            'button_alt-active'
                        )
                    );


                    button.classList.add(
                        'button_alt-active'
                    );


                    this.events.emit(
                        'order:change',
                        {
                            payment:
                                button.textContent === 'Онлайн'
                                    ? 'online'
                                    : 'cash'
                        }
                    );


                    this.validate();

                }
            );

        });


        const addressInput =
            this.element.querySelector(
                'input[name="address"]'
            ) as HTMLInputElement;


        addressInput?.addEventListener(
            'input',
            () => {

                this.events.emit(
                    'order:change',
                    {
                        address: addressInput.value
                    }
                );


                this.validate();

            }
        );

    }


    private validate() {

        const button =
            this.element.querySelector(
                '.order__button'
            ) as HTMLButtonElement;


        const payment =
            this.element.querySelector(
                '.button_alt-active'
            );


        const address =
            (
                this.element.querySelector(
                    'input[name="address"]'
                ) as HTMLInputElement
            ).value;


        button.disabled =
            !payment || !address;

    }


    render() {

        return this.element;

    }

}