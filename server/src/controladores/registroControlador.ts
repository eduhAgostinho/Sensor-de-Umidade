import { Request, Response, NextFunction } from 'express';
import { Registro } from '../entidades/registro';
import { RegistroRepositorio } from '../persistencia/registroRepositorio';
import { Negocio } from '../negocio/negocio';
import { bodyRegistro } from '../entidades/reqBody';
 

export class RegistroControlador {
    static async novoRegistro(req: Request, res: Response, next: NextFunction) {
        try { 
            const registro = req.body as bodyRegistro;
            const result = await Negocio.novoRegistro(registro); 
            if (result) {
                res.status(201).end();
            } else {
                res.status(404).end();
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async registros(req: Request, res: Response, next: NextFunction) {
        try {   
            const query = await RegistroRepositorio.buscarRegistro();
            res.json(query);
        } catch (erro) {
            next(erro);
        }
    }

    static async buscarRegistroPlanta(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.query.idPlanta;
            const query = await RegistroRepositorio.buscarRegistrosPlanta(id);
            if (!query) {
                res.status(404).end();
            } else {
                res.json(query);
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async buscarRegistro(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const query = await RegistroRepositorio.registro(id);
            if (!query) {
                res.status(404).end();
            } else {
                res.json(query);
            }
        } catch (erro) {
            next(erro);
        }
    }

}