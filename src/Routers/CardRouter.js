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

router.delete('/:id', (req, res, next) => {
    process.nextTick(() => {
        Card.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(card => {
            if (!card) console.log(`card row not found with id ${req.params.id}`);
            
            res.status(200).json({
                message: `card deleted`
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

function getCardById (req, res, next) {
    process.nextTick(() => {
        Card.findOne({ where: {
            id: req.params.id
        }, 
        include: [{ model: Phone, as: 'phones' }]})
        .then(card => {
            if (!card) {
                res.status(404).json({
                    message: `card not found with id: ${req.params.id}`
                });
            } else {
                res.card = card;
                next();
            }
        })
        .catch(err => {
            res.status(500).json({
                message: `some error retrieving cards`,
                err
            });
        });
    });
}

router.get('/:id', getCardById, (req, res, next) => {
    res.status(200).json({
        message: `get card with id: ${req.params.id}`,
        card: res.card
    });
});

router.post('/', (req, res, next) => {
    process.nextTick(() => {
        Card.create({
            nama: req.body.nama,
            alamat: req.body.alamat
        })
        .then(card => {
            res.card = card;
            next();
        })
        .catch(err => {
            res.status(500).json({
                message: `Error`,
                err
            });
        });
    });
}, (req, res, next) => {
    if (req.body.phones) {
        req.body.phones.forEach(p => {
            Phone.create({
                CardId: res.card.id,
                telepon: p
            });
        });
    }
    req.params.id = res.card.id;
    next();
}, getCardById, (req, res, next) => {
    res.status(200).json({
        message: `done creating card`,
        card: res.card
    });
});

router.patch('/:id', getCardById, (req, res, next) => {
    const nama = req.body.nama ? req.body.nama : res.card.nama;
    const alamat = req.body.alamat ? req.body.alamat : res.card.alamat;

    process.nextTick(() => {
        Card.update({
                nama: nama, alamat: alamat
            },
            {
                where: {
                    id: res.card.id
                }
            }
        )
        .then(result => {
            next();
        })
        .catch(err => {
            console.error(err);
            res.status(200).json({
                message: `error updating row`,
                err
            });
        });
    });
}, (req, res, next) => {
    // delete all phone with cardId
    process.nextTick(() => {
        Phone.destroy({
            where: {
                CardId: res.card.id
            }
        })
        .then(phones => {
            next();
        })
        .catch(err => {
            res.status(500).json({
                message: `Error`,
                err 
            });
        });
    });
}, (req, res, next) => {
    if (req.body.phones) {
        req.body.phones.forEach(p => {
            Phone.create({
                CardId: res.card.id,
                telepon: p
            });
        });
    }
    req.params.id = res.card.id;
    next();
}, getCardById, (req, res, next) => {
    res.status(200).json({
        message: `done updating card`,
        card: res.card
    });
});

export default router;