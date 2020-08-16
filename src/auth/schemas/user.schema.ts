import { Schema } from "mongoose";

export const UserSchema = new Schema({
    name: String,
    email: {
        unique: true,
        type: String,
    },
    password: String,
    dates: {
        created: Number,
        updated: Number
    }
}, {
    timestamps: { createdAt: 'dates.created', updatedAt: 'dates.updated' }
});