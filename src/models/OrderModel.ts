export interface IOrderData {

    payment: string;
    address: string;
    email: string;
    phone: string;

}


export class OrderModel {


    data: IOrderData = {

        payment: '',

        address: '',

        email: '',

        phone: ''

    };


    setData(data: Partial<IOrderData>) {

        this.data = {

            ...this.data,

            ...data

        };

    }


    clear() {

        this.data = {

            payment: '',

            address: '',

            email: '',

            phone: ''

        };

    }

}