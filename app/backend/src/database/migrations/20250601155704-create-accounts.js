'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Accounts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
      }
      // Même logique : pas de createdAt / updatedAt car timestamps: false dans Account.ts
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Accounts');
  }
};
