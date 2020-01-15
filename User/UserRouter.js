import { Router } from 'express'
import User from './User';

const router = Router();

router.get('/', (req, res, next) => {
   
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
})

export default router;