import { DataTypes } from 'sequelize';
import sequelize from '../sqlitedbconn';

const Card = sequelize.define('Card', {
  nama: {
    type: DataTypes.STRING
  },
  alamat: {
    type: DataTypes.STRING
  }
});

// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const Card = sequelize.define('Card', {
//     nama: DataTypes.STRING,
//     alamat: DataTypes.STRING
//   }, {});
//   Card.associate = function(models) {
//     Card.hasMany(models.Phone, { foreignKey: 'CardId', as: 'phones' });
//   };
//   return Card;
// };

export default Card;