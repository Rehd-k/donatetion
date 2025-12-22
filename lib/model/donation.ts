import mongoose, { Schema, Document } from "mongoose";

export interface IDonation extends Document {
    user?: mongoose.Types.ObjectId;
    campaign: mongoose.Types.ObjectId;
    amount: number;
    currency: string;
    paymentMethod: 'crypto' | 'card';
    transactionId: string;
    createdAt: Date;
    updatedAt: Date;
    status: string
}


const donationSchema = new Schema<IDonation>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        currency: { type: String, enum: ['NGN', 'USD', 'EUR', 'GBP'], required: true },
        campaign: {
            type: Schema.Types.ObjectId,
            ref: 'Campaign',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
        },
        transactionId: {
            type: String
        },
        status: {
            type: String
        },
    },
    { timestamps: true }
);
const Donation = mongoose.models?.Donation || mongoose.model<IDonation>('Donation', donationSchema);

export { Donation }