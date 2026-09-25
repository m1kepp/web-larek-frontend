export class Modal {

    protected container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;

        const closeButton =
            this.container.querySelector('.modal__close');

        closeButton?.addEventListener(
            'click',
            () => this.close()
        );
    }


    open(content: HTMLElement) {

        const contentContainer =
            this.container.querySelector('.modal__content');

        if (contentContainer) {
            contentContainer.innerHTML = '';
            contentContainer.appendChild(content);
        }

        this.container.classList.add('modal_active');
    }


    close() {
        this.container.classList.remove('modal_active');
    }

}