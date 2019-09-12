import { Response, Request, NextFunction } from 'express';
import { Subscription } from '../entidades/subscription';
import { SubsRepositorio } from '../persistencia/subsRepositorio';

export class WebPushControlador {
    static async subscribe(req: Request, res: Response, next: NextFunction) {
        try {
            const pushSubscription = req.body as Subscription;
            await SubsRepositorio.novoSubscription(pushSubscription);
            res.status(201).end();
        } catch (erro) {
            next(erro); 
        }
    }
}