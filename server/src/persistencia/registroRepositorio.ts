import { Registro } from "../entidades/registro";
import { RegistroModel } from "./registroModel";
import { PlantaModel } from "./plantaModel";

export class RegistroRepositorio {
    static async novoRegistro(reg: Registro): Promise<Registro> {
        return await RegistroModel.create(reg);
    }

    static async buscarRegistro(): Promise<Registro[]> {
        return await RegistroModel.find().sort({ data: 'desc' }).populate('planta', PlantaModel).limit(100).exec();
    }

    static async buscarRegistrosPlanta(idPlanta: string): Promise<Registro[]> {
        return await RegistroModel.find({ planta: idPlanta }).sort({ data: 'desc' }).populate('planta', PlantaModel).exec();
    }

    static async registro(id: string): Promise<Registro|null>{
        return await RegistroModel.findById(id).populate('planta', PlantaModel).exec();
    }

} 