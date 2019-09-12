import { Schema, Document, model } from 'mongoose';
import { User } from '../entidades/user';

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});
interface UserDocument extends Document, User{}
export const UserModel = model<UserDocument>('user', UserSchema);