import express from 'express';
import bodyParser from 'body-parser';
import errorhandler from 'errorhandler';
import cors from 'cors';
import { router } from './router';
import webPush from 'web-push'; 
import path from 'path';
import { routerAuth } from './authrotas';
import { pass } from './auth';

const publicKey = 'BLxxlwet7f170fGgMz38wEzrO8cxgC-pWKYUSlILpk0tqOqNZ2Z9xki09Tx-TBmZuXOBq0omLrs38Ohhgvq0osc';
const privateKey = 'k0BKNxb4dgFWUYd-8s-PFVK_egMQAatFSgcRglTDn4I';

webPush.setVapidDetails('mailto: eduardo.littleagosto@gmail.com', publicKey, privateKey);

const app = express();

app.use(express.static(path.join(__dirname, '../../client')));

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(pass.initialize());
app.use(cors());
app.use('/auth', routerAuth);
app.use('/api', router);
if (process.env.NODE_ENV !== "production") {
    app.use(errorhandler());
} 
export default app;