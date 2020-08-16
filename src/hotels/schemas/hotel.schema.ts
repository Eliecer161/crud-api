import { Schema } from "mongoose";

export const HotelsSchema = new Schema({
    name: String,
    address: String,
    city: String,
    department: String,
    price: String,
    dates: {
        created: Number,
        updated: Number
    }
}, {
    timestamps: { createdAt: 'dates.created', updatedAt: 'dates.updated' }
});