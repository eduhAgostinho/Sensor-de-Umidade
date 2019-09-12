import Router from 'express';
import { RegistroControlador } from './controladores/registroControlador';
import { PlantaControlador } from './controladores/plantacontrolador';
import { WebPushControlador } from './controladores/webPushControlador';
import passport from 'passport';
import { UserControlador } from './controladores/userControlador';

const router = Router();

router.get('/registro', passport.authenticate('jwt', {session:false}), RegistroControlador.registros);
router.post('/registro', RegistroControlador.novoRegistro);
router.get('/registro/search?', passport.authenticate('jwt', {session:false}), RegistroControlador.buscarRegistroPlanta);
router.get('/registro/:id', passport.authenticate('jwt', {session:false}), RegistroControlador.buscarRegistro);
router.get('/planta/:nomePlanta', passport.authenticate('jwt', {session:false}), PlantaControlador.nomePlanta);
router.post('/user', UserControlador.newUser);

//Subscribe Rota
router.post('/subscribe', passport.authenticate('jwt', {session:false}), WebPushControlador.subscribe);


export {router}; 