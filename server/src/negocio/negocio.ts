import { Registro } from "../entidades/registro";
import * as RegistroRepositorio from "../persistencia/registroRepositorio";
import * as PlantaRepositorio from "../persistencia/plantaRepositorio";
import { Planta } from "../entidades/planta";
import * as SubsRepositorio from "../persistencia/subsRepositorio";
import { notificacao } from '../entidades/notificacao';
import webPush from 'web-push';
import { bodyRegistro } from "../entidades/reqBody";

export async function novoRegistro(reg: bodyRegistro): Promise<Planta | boolean> {

    const planta = await PlantaRepositorio.plantaID(reg.planta);
    if (planta) {
        const porcentual = reg.umidade * 100 / 1023;
        reg.umidade = Math.round(porcentual);
        const subs = await SubsRepositorio.buscarSubs();
        if (reg.umidade < planta.minUmidade) {
            subs.map(sub => {
                webPush.sendNotification(sub, JSON.stringify(notificacao(planta.nome, 'abaixo'))).catch(err => { console.log(err) });
            });
        } else if (reg.umidade > planta.maxUmidade) {
            subs.map(sub => {
                webPush.sendNotification(sub, JSON.stringify(notificacao(planta.nome, 'acima'))).catch(err => { console.log(err) });
            });
        }
        const registro: Registro = { umidade: reg.umidade, planta: planta };
        await RegistroRepositorio.novoRegistro(registro);
        return true;
    }
    return false;
}

export async function verifPlanta(idPlanta: string): Promise<boolean> {
    const query = await PlantaRepositorio.planta(idPlanta);
    if (!query) return false;
    else return true;
}