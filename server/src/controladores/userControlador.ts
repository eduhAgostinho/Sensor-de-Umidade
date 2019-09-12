import { Request, Response, NextFunction } from 'express';
import { User } from '../entidades/user';
import * as UserRepositorio from '../persistencia/userRepositorio';


export async function newUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.body as User;
        const cad = await UserRepositorio.newUser(user);
        if (cad) res.status(201).end()
        else res.status(500).end();
    } catch (err) {
        next(err);
    }
}
