import { Planta } from "./planta";

export interface Registro {
    planta: Planta,
    umidade: number,
    data?: Date
}