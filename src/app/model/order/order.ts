import { SimpleOrder, User, LineItem, Address } from "../../model";

export class Order extends SimpleOrder {
    driver: User;
    customer: User;
    lineItems: LineItem[];
    deliveryAddress: Address;
    deliveryFees: number;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        super(data);
        this.driver = new User(data.Driver);
        this.customer = new User(data.Customer);
        this.customer.address =
            data.Customer.addresses && data.Customer.addresses.length > 0
                ? new Address(data.Customer.addresses[0])
                : null;
        this.lineItems = data.LineItems.map(lineItem => new LineItem(lineItem));
        this.deliveryAddress = new Address(data.deliveryAddress);
        this.deliveryFees = data.deliveryFees;
    }
}
