import { Schema, Document, model} from 'mongoose';
import { Planta } from '../entidades/planta';
import { ObjectID } from 'bson';

const PlantaSchema = new Schema({
    nome: { type: String, required: true},
    maxUmidade: { type: Number, required: true },
    minUmidade: { type: Number, required: true },
    idPlanta: { type: String, required: true ,select: false }
});
interface PlantaDocument extends Document, Planta {}
export const PlantaModel = model<PlantaDocument>('planta', PlantaSchema);