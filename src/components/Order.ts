import { IOrderData } from '../models/OrderModel';
type OrderChange = Partial<IOrderData> & {
    next?: boolean;
};
export class Order {

    protected element: HTMLElement;
    protected onChange?: (data: OrderChange)=>void;


    constructor(
        element: HTMLElement,
        onChange?: (data:OrderChange)=>void
    ) {
        this.element = element;
        this.onChange = onChange;
        const nextButton =
    this.element.querySelector(
        '.order__button'
    );


        nextButton?.addEventListener(
            'click',
            () => {

                this.onChange?.({
                    next: true
                });

            }
        );

        const buttons =
            this.element.querySelectorAll('.button_alt');


        buttons.forEach(button => {

            button.addEventListener(
                'click',
                () => {

                    buttons.forEach(btn =>
                        btn.classList.remove('button_alt-active')
                    );


                    button.classList.add(
                        'button_alt-active'
                    );
                    this.validate();


                    this.onChange?.({
                        payment:
                            button.textContent === 'Онлайн'
                            ? 'online'
                            : 'cash'
                    });

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

                this.onChange?.({
                    address:
                        addressInput.value
                });
                this.validate();

            }
        );

    }


    render() {
        return this.element;
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
}
