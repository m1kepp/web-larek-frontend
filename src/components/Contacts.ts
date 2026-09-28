import { IOrderData } from '../models/OrderModel';
import { EventEmitter } from './base/events';


type ContactsChange = Partial<IOrderData> & {
    submit?: boolean;
};


export class Contacts {

    protected element: HTMLElement;


    constructor(
        element: HTMLElement,
        protected events: EventEmitter
    ) {

        this.element = element;


        const inputs =
            this.element.querySelectorAll(
                'input'
            );


        inputs.forEach(input => {

            input.addEventListener(
                'input',
                () => {


                    this.events.emit(
                        'contacts:change',
                        {
                            [input.name]:
                                input.value
                        }
                    );


                    this.validate();

                }
            );

        });


        const submitButton =
            this.element.querySelector(
                'button[type="submit"]'
            );


        submitButton?.addEventListener(
            'click',
            (event) => {

                event.preventDefault();


                this.events.emit(
                    'contacts:submit',
                    {
                        submit: true
                    }
                );

            }
        );

    }


    private validate() {

        const button =
            this.element.querySelector(
                'button[type="submit"]'
            ) as HTMLButtonElement;


        const email =
            (
                this.element.querySelector(
                    'input[name="email"]'
                ) as HTMLInputElement
            ).value;


        const phone =
            (
                this.element.querySelector(
                    'input[name="phone"]'
                ) as HTMLInputElement
            ).value;


        button.disabled =
            !(email && phone);

    }


    render() {

        return this.element;

    }

}