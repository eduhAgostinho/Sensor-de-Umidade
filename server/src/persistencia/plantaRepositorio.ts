import { Planta } from "../entidades/planta";
import { PlantaModel } from "./plantaModel";
import { ObjectID } from "bson";


export async function planta(id: string): Promise<Planta | null> {
    return await PlantaModel.findOne().where({ idPlanta: id }).exec();
}

export async function nomePlanta(nome: string): Promise<Planta | null> {
    return await PlantaModel.findOne().where({ nome: nome }).exec();
}

export async function plantaID(id: string): Promise<Planta | null> {
    return await PlantaModel.findById(new ObjectID(id)).exec();
}