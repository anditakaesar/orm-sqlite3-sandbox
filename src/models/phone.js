import { DataTypes } from 'sequelize';
import sequelize from '../sqlitedbconn';

const Phone = sequelize.define('Phone', {
  telepon: {
    type: DataTypes.STRING
  }
});

export default Phone;