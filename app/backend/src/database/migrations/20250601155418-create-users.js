'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Accounts',  // ⚠️ Ce modèle/table doit exister
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
      // Pas de createdAt ni updatedAt car tu as "timestamps: false" dans User.ts
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
