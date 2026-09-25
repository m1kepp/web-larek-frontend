export class AppPresenter {

    constructor(
        private events: any,
        private api: any,
        private productsModel: any,
        private basketModel: any,
        private orderModel: any,
        private catalog: any
    ) {}

    init() {

    this.api.get('/product')
        .then((data: any) => {

            this.productsModel.setProducts(data.items);

          this.catalog.render(
            data.items
            );

            this.events.emit(
                'products:loaded',
                data.items
            );

            

        })
        .catch((error: any) => {

            console.error(
                'Products loading error:',
                error
            );

        });

}

}