'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate('Users', {
      active: true
    }, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate('Users', {
      active: null
    }, {});
  }
};
