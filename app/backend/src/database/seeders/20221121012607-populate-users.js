'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Importer le modèle User
    const User = require('../models/User').default;



    const users = [
      {
        username: 'raphaelmartins',
        password: '$2a$10$fSZZa/tIodeeOJ.JGn6IbuP9QZ44gaN0b1.XCAis/VgNDM.XXlTmC',
        accountId: 1,
      },
      {
        username: 'daniloputinato',
        password: '$2a$10$fSZZa/tIodeeOJ.JGn6IbuP9QZ44gaN0b1.XCAis/VgNDM.XXlTmC',
        accountId: 2,
      },
    ];

    for (const userData of users) {
      await User.findOrCreate({
        where: { username: userData.username },
        defaults: {
          password: userData.password,
          accountId: userData.accountId,
        },
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {
      username: ['raphaelmartins', 'daniloputinato'],
    });
  },
};
