import { IOrderData } from '../models/OrderModel';
type ContactsChange = Partial<IOrderData> & {
    submit?: boolean;
};
export class Contacts {

    protected element: HTMLElement;
    protected onChange?: (data: ContactsChange)=>void;


    constructor(
    element: HTMLElement,
    onChange?: (data: ContactsChange)=>void
    )    {

        this.element = element;
        this.onChange = onChange;


        const inputs =
            this.element.querySelectorAll(
                'input'
            );


        inputs.forEach(input => {

            input.addEventListener(
                'input',
                () => {

                    this.onChange?.({

                        [input.name]:
                            input.value

                    });
                    validate();

                }
            );

        });
        const validate = () => {

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

};
        const submitButton =
    this.element.querySelector(
        'button[type="submit"]'
    );


    submitButton?.addEventListener(
        'click',
        (event)=>{

            event.preventDefault();

            this.onChange?.({
                submit:true
            });

        }
    );
    }
    

    render() {

        return this.element;

    }

}