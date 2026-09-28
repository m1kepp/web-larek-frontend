import { EventEmitter } from '../components/base/events';


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


    constructor(
        private events: EventEmitter
    ) {}


    setData(data: Partial<IOrderData>) {

        this.data = {
            ...this.data,
            ...data
        };


        this.events.emit(
            'order:changed',
            this.data
        );

    }


    clear() {

        this.data = {

            payment: '',
            address: '',
            email: '',
            phone: ''

        };


        this.events.emit(
            'order:changed',
            this.data
        );

    }

}