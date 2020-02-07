import { Router } from 'express';
import { DataTypes } from 'sequelize';
import sequelize from '../sqlitedbconn';
import UserModel from '../models/user';
const User = UserModel(sequelize, DataTypes);

const router = Router();

router.get('/', (req, res, next) => {
    process.nextTick(() => {
        User.findAll()
        .then(users => {
            
            if (users) {
                res.status(200).json({
                    message: `retrieving all users`,
                    users
                });
            } else {
                res.status(200).json({
                    message: `no users found`,
                    users: null
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: `something wrong`,
                err
            });
        });
    });
});

router.post('/', (req, res, next) => {
    process.nextTick(() => {
        User.create({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            active: req.body.active
        })
        .then(user => {
            res.status(200).json({
                message: `Created user: ${req.body.firstname}`,
                user
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `Error`,
                err
            });
        });
    });
});

router.get('/:id', (req, res, next) => {
    process.nextTick(() => {
        Card.findByPk(parseInt(req.params.id))
        .then(user => {
            if (user) {
                res.status(200).json({
                    message: `user with id ${req.params.id}`,
                    user
                });
            } else {
                res.status(404).json({
                    message: `user not found`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: `error`,
                err
            });
        });
    });
});

router.delete('/:id', (req, res, next) => {
    process.nextTick(() => {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            if (!user) console.log(`user row not found with id ${req.params.id}`);
            
            res.status(200).json({
                message: `user deleted`
            });
        })
        .catch();
    });
});

router.patch('/:id', 
(req, res, next) => {
    User.findByPk(parseInt(req.params.id))
        .then(user => {
            if (user) {
                res.user = user;
                next();
            } else {
                res.status(404).json({
                    message: `user not found`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: `error`,
                err
            });
        });
},
(req, res, next) => {
    const fn = req.body.firstname ? req.body.firstname : res.user.firstName;
    const ln = req.body.lastname ? req.body.lastname : res.user.lastName;
    const em = req.body.email ? req.body.email : res.user.email;
    const ac = req.body.active !== undefined ? req.body.active : res.user.active;
    let updatedUser = {
        id: res.user.id,
        firstName: fn, lastName: ln, email: em, active: ac
    }

    process.nextTick(() => {
        User.update({
                firstName: fn, lastName: ln, email: em, active: ac
            },
            {
                where: {
                    id: res.user.id
                }
            }
        )
        .then(result => {
            // console.log(result);
            res.status(200).json({
                message: `user updated`,
                user: updatedUser,
                history: res.user
            });
        })
        .catch(err => {
            console.error(err);
            res.status(200).json({
                message: `error updating row`,
                err
            });
        });
    });
});


export default router;