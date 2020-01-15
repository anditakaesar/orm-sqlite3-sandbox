import express from 'express';
import cors from 'cors';
import User from './User/User';
const app = express();

require('./sqlitedbconn');

// middlewares
app.use(cors());

app.use('/create-user', (req, res, next) => {
    User.create({ firstName: "Andita", lastName: "Fahmi" })
        .then(user => {
            res.status(200).json({
                message: `${user.id} generated`
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `Error`,
                err
            });
        });
});

app.use('/user', require('./User/UserRouter').default);

export default app;