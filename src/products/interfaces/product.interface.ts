import { Document } from "mongoose";

export interface Product extends Document {
    name: string,
    price: number,
    description: string,
    image: string,
    dates: {
        created: number,
        updated: number
    }
}