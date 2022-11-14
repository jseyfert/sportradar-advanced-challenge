'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playerId: {
        type: Sequelize.STRING
      },
      playerName: {
        type: Sequelize.STRING
      },
      teamId: {
        type: Sequelize.STRING
      },
      teamName: {
        type: Sequelize.STRING
      },
      playerAge: {
        type: Sequelize.STRING
      },
      playerNumber: {
        type: Sequelize.STRING
      },
      playerPosition: {
        type: Sequelize.STRING
      },
      assists: {
        type: Sequelize.STRING
      },
      goals: {
        type: Sequelize.STRING
      },
      hits: {
        type: Sequelize.STRING
      },
      points: {
        type: Sequelize.STRING
      },
      penaltyMinutes: {
        type: Sequelize.STRING
      },
      opponnetTeam: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Players');
  }
};