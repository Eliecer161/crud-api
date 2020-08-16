import { Schema } from "mongoose";

export const ProductSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    dates: {
        created: Number,
        updated: Number
    }
}, {
    timestamps: { createdAt: 'dates.created', updatedAt: 'dates.updated' }
});