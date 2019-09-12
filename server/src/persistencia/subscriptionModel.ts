import { Schema, model, Document } from 'mongoose';
import { Subscription } from '../entidades/subscription'; 

const SubscriptionSchema = new Schema({
    endpoint: { type: String, required: true },
    expirationTime: { type: Number, default: null },
    keys: {
        auth: String,
        p256dh: String 
    }
});
interface SubscriptionDocument extends Document, Subscription {}
export const SubsModel = model<SubscriptionDocument>('Subscription', SubscriptionSchema);