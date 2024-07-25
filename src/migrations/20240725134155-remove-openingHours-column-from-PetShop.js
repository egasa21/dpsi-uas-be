'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn('PetShops', 'openingHours');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn('PetShops', 'openingHours', {
            type: Sequelize.DATE,
        });
    }
};
