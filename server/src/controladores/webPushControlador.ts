import { Response, Request, NextFunction } from 'express';
import { Subscription } from '../entidades/subscription';
import * as SubsRepositorio from '../persistencia/subsRepositorio';

export async function subscribe(req: Request, res: Response, next: NextFunction) {
    try {
        const pushSubscription = req.body as Subscription;
        await SubsRepositorio.novoSubscription(pushSubscription);
        res.status(201).end();
    } catch (erro) {
        next(erro);
    }
}
