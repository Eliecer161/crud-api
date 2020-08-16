import { Document } from "mongoose";

export interface Hotel extends Document {
    name: string,
    address: string,
    city: string,
    department: string,
    price: number,
    dates: {
        created: number,
        updated: number
    }
}