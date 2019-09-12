import { Schema, model, Document, SchemaTypes } from 'mongoose';
import { Registro } from '../entidades/registro';

const RegistroSchema = new Schema({
    planta: { type: SchemaTypes.ObjectId, ref: 'planta', required: true },
    umidade: { type: Number, required: true },
    data: { type: Date, default: Date.now }
});
interface RegistroDocument extends Document, Registro {}
export const RegistroModel = model<RegistroDocument>('registro', RegistroSchema);
