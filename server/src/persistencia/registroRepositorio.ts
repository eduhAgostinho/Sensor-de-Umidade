import { Registro } from "../entidades/registro";
import { RegistroModel } from "./registroModel";
import { PlantaModel } from "./plantaModel";

export async function novoRegistro(reg: Registro): Promise<Registro> {
    return await RegistroModel.create(reg);
}

export async function buscarRegistro(): Promise<Registro[]> {
    return await RegistroModel.find().sort({ data: 'desc' }).populate('planta', PlantaModel).limit(100).exec();
}

export async function buscarRegistrosPlanta(idPlanta: string): Promise<Registro[]> {
    return await RegistroModel.find({ planta: idPlanta }).sort({ data: 'desc' }).populate('planta', PlantaModel).exec();
}

export async function registro(id: string): Promise<Registro | null> {
    return await RegistroModel.findById(id).populate('planta', PlantaModel).exec();
}

