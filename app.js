import express from 'express';
import cors from 'cors';
import { User } from './models/User';

const app = express();

// middlewares
app.use(cors());

app.use('/', (req, res, next) => {
    res.status(200).json({
        message: 'success'
    });
});

app.use('/create-user', (req, res, next) => {
    res.status(200).json({
        message: 'test create new entity'
    });
});

export default app;