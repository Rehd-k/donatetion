import mongoose, { Schema, Document } from "mongoose";

export interface ICampaign extends Document {
    title: string;
    description: string;
    category: string;
    targetAmount: number;
    currentAmount: number;
    images: {
        url: { type: String, required: true },
        public_id: { type: String, required: true }, // make required for safe deletion
    }[];
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const campaignSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    targetAmount: {               // ← Renamed from goalAmount to match your model
        type: Number,
        required: true,
    },
    currentAmount: {
        type: Number,
        default: 0,
    },
    images: [
        {
            url: { type: String, required: true },
            public_id: { type: String, required: true }, // make required for safe deletion
        }
    ],
    tags: [
        {
            type: String,
        },
    ],
    active: {
        type: Boolean,
        default: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,             // ← Make sure creator is required or set it manually
    },
}, {
    timestamps: true,
});

const Campaign = mongoose.models?.Campaign || mongoose.model<ICampaign>('Campaign', campaignSchema);

export { Campaign };

