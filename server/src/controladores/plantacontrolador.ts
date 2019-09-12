import { NextFunction, Request, Response } from "express";
import { PlantaRepositorio } from "../persistencia/plantaRepositorio";

export class PlantaControlador {
    static async nomePlanta(req: Request, res: Response, next: NextFunction) {
        try {
            const nome = req.params.nomePlanta;
            const query = await PlantaRepositorio.nomePlanta(nome);
            if (query) {
                res.json(query);
            } else {
                res.status(404).end();
            }
        } catch (erro) {
            next(erro);
        } 
    }
}