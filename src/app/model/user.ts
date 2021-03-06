export const UserKey = "user";
export const TokenKey = "token";

import { Stores, Address } from "../model";

export class User {
    id: number;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    userName: string;
    lastLogin: Date;
    gender: number;
    isFbUser: boolean;
    dob: Date;
    store: Stores;
    address: Address;

    constructor(data: any = {}) {
        if (!data) {
            data = {};
            return;
        }
        this.id = data.id;
        this.email = data.email;
        this.phone = data.phone;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.userName = data.userName;
        this.lastLogin = data.lastLogin;
        this.gender = data.gender;
        this.isFbUser = data.isFbUser;
        this.dob = data.dob;
        this.store = new Stores(data.store);
    }

    get name(): string {
        if (!!this.firstName && !!this.lastName) {
            return this.firstName + " " + this.lastName;
        }
        if (!!this.firstName) {
            return this.firstName;
        }
        if (!!this.lastName) {
            return this.lastName;
        }
        return "";
    }

    public static storeToken(token: string) {
        localStorage.setItem(TokenKey, token);
    }

    public static getStoredToken(): any {
        try {
            return localStorage.getItem(TokenKey);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public static storeUser(data: any = {}) {
        localStorage.setItem(UserKey, JSON.stringify(data));
    }

    public static removeAllItems() {
        localStorage.removeItem(UserKey);
        localStorage.removeItem(TokenKey);
    }

    public static getStoredUser(): any {
        try {
            return JSON.parse(localStorage.getItem(UserKey));
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
