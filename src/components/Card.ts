export interface ICardData {
    id: string;
    title: string;
    image: string;
    category: string;
    price: number | null;
    description?: string;
}


export class Card {

    protected element: HTMLElement;


    constructor(
        element: HTMLElement,
        onClick?: () => void
    ) {
        this.element = element;

        if (onClick) {
            this.element.addEventListener(
                'click',
                onClick
            );
        }
    }


    render(data: ICardData) {

        const title =
            this.element.querySelector('.card__title');

        const image =
            this.element.querySelector('.card__image') as HTMLImageElement;

        const category =
            this.element.querySelector('.card__category');

        const price =
            this.element.querySelector('.card__price');


        if (title) {
            title.textContent = data.title;
        }


        if (image) {
            image.src =
                `https://larek-api.nomoreparties.co/content/weblarek${data.image}`;

            image.alt = data.title;
        }


        if (category) {
            category.textContent = data.category;
        }


        if (price) {
            price.textContent =
                data.price
                    ? `${data.price} синапсов`
                    : 'Бесценно';
        }


        return this.element;
    }
}