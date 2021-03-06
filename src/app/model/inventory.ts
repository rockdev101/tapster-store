import { Product } from "./product";
import { Category } from "./category";
import { Size } from "./size";
import { Stores } from "./stores";

export class Inventory {
    id: number;
    price: number;
    product: Product;
    category: Category;
    size: Size;
    store: Stores;
    quantity: number;
    constructor(data: any = {}) {
        if (!data) {
            data = {};
        }
        this.product = new Product(data.Product);
        this.category = new Category(data.Product ? data.Product.Category : {});
        this.size = new Size(data.Size);
        this.store = new Stores(data.Store);
        this.id = data.id;
        this.price = data.price;
        this.quantity = data.quantity;
    }
}
