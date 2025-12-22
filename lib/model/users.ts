import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    favorites: any,
    role: 'admin' | 'user' | 'donor';  // Fixed: added 'donor'
    donations: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ['admin', 'user', 'donor'],
            default: 'user',
        },
        donations: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Donation',
            },
        ],
        favorites: [{ type: Schema.Types.ObjectId, ref: 'Campaign' }],
    },
    { timestamps: true }
);

// This is the correct, safe pattern for Next.js
const User = mongoose.models?.User || mongoose.model<IUser>('User', userSchema);

export { User };