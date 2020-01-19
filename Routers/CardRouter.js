import { Router } from 'express';
import Card from '../models/card';
import Phone from '../models/phone';
const router = Router();

Card.hasMany(Phone, { foreignKey: 'CardId', as: 'phones'});
Phone.belongsTo(Card);

router.get('/', (req, res, next) => {
    process.nextTick(() => {
        Card.findAll({ include: [{ model: Phone, as: 'phones' }]})
        .then(cards => {
            res.status(200).json({
                message: `retrieving all cards`,
                cards
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: `some error retrieving cards`,
                err
            });
        })
    });
});

router.get('/:id', (req, res, next) => {
    process.nextTick(() => {
        Card.findAll({ where: {
            id: req.params.id
        }, 
        include: [{ model: Phone, as: 'phones' }]})
        .then(card => {
            res.status(200).json({
                message: `retrieving card`,
                card
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `some error retrieving cards`,
                err
            });
        });

    });
})

router.post('/', (req, res, next) => {
    process.nextTick(() => {
        Card.create({
            nama: req.body.nama,
            alamat: req.body.alamat
        })
        .then(card => {

            if (req.body.phones) {
                req.body.phones.forEach(p => {
                    Phone.create({
                        CardId: card.id,
                        telepon: p
                    });
                });
            }

            res.status(200).json({
                message: `Created card: ${req.body.nama}`,
                card: createdCard
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

export default router;