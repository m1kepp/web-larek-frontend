export interface ICardData {
    id: string;
    title: string;
    image: string;
    category: string;
    price: number | null;
    description: string;
}


export class Card {

    protected element: HTMLElement;


    constructor(
        element: HTMLElement
    ) {

        this.element = element;

    }


    protected setCategoryColor(
        category: HTMLElement,
        type: string
    ) {

        const categoryMap: Record<string, string> = {

            'софт-скил': 'card__category_soft',
            'хард-скил': 'card__category_hard',
            'другое': 'card__category_other',
            'дополнительное': 'card__category_additional',
            'кнопка': 'card__category_button'

        };


        Object.values(categoryMap)
            .forEach(className => {

                category.classList.remove(
                    className
                );

            });


        const className =
            categoryMap[type];


        if (className) {

            category.classList.add(
                className
            );

        }

    }


    render(data: ICardData) {

        const title =
            this.element.querySelector(
                '.card__title'
            );


        const image =
            this.element.querySelector(
                '.card__image'
            ) as HTMLImageElement;


        const category =
        this.element.querySelector(
            '.card__category'
        ) as HTMLElement;


        const price =
            this.element.querySelector(
                '.card__price'
            );


        if (title) {

            title.textContent =
                data.title;

        }


        if (image) {

            image.src =
                `https://larek-api.nomoreparties.co/content/weblarek${data.image}`;

            image.alt =
                data.title;

        }


        if (category) {

            category.textContent =
                data.category;


            this.setCategoryColor(
                category,
                data.category.toLowerCase()
            );

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