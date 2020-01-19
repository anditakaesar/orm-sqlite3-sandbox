import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
const app = express();

require('./sqlitedbconn');

// middlewares
app.use(cors());
app.use(json());
app.use(helmet());
app.use(compression());
app.use(urlencoded({ extended: true }));

app.use('/user', require('./Routers/UserRouter').default);
app.use('/card', require('./Routers/CardRouter').default);

export default app;