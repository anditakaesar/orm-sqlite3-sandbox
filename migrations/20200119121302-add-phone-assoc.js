'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Phones',
      'CardId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cards',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Phones', // name of Source model
      'CardId' // key we want to remove
    );
  }
};
