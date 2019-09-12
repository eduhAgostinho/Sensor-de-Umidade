import { Planta } from "../entidades/planta";
import { PlantaModel } from "./plantaModel";
import { ObjectID } from "bson";


export class PlantaRepositorio {
    static async planta(id: string): Promise<Planta|null> {
        return await PlantaModel.findOne().where({ idPlanta: id }).exec();
    }

    static async nomePlanta(nome: string): Promise<Planta|null> {
        return await PlantaModel.findOne().where({ nome: nome }).exec();
    }

    static async plantaID(id: string): Promise<Planta|null> {
        return await PlantaModel.findById(new ObjectID(id)).exec();
    }
}