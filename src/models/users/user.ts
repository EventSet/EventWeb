export class User {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
    bio?: string;
    dob?: Date;
    gender?: string;
    address?: {
        street: string;
        city: string;
        zipcode: string;
        state: string;
        country: string;
    };
    location?: {
        lat: string;
        lgt: string;
    };
    friends?: Array<String>;

    constructor() {}

}
