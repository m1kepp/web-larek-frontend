export class CardPreview {

    protected element: HTMLElement;
    protected onAdd?: () => void;

    constructor(
    element: HTMLElement,
    onAdd?: () => void
) {
    this.element = element;
    this.onAdd = onAdd;


    const button =
        this.element.querySelector('.card__button');


    button?.addEventListener(
        'click',
        () => {
            this.onAdd?.();
        }
    );
}

    render(product: any) {

        const image =
            this.element.querySelector('.card__image') as HTMLImageElement;

        const title =
            this.element.querySelector('.card__title');

        const category =
            this.element.querySelector('.card__category');

        const description =
            this.element.querySelector('.card__text');

        const price =
            this.element.querySelector('.card__price');


        if (image) {
            image.src =
                `https://larek-api.nomoreparties.co/content/weblarek${product.image}`;

            image.alt = product.title;
        }


        if (title) {
            title.textContent = product.title;
        }


        if (category) {
            category.textContent = product.category;
        }


        if (description) {
            description.textContent = product.description;
        }


        if (price) {
            price.textContent =
                product.price
                    ? `${product.price} синапсов`
                    : 'Бесценно';
        }


        return this.element;
    }
}