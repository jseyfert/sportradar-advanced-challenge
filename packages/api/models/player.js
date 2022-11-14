'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Player.init({
    playerId: DataTypes.STRING,
    playerName: DataTypes.STRING,
    teamId: DataTypes.STRING,
    teamName: DataTypes.STRING,
    playerAge: DataTypes.STRING,
    playerNumber: DataTypes.STRING,
    playerPosition: DataTypes.STRING,
    assists: DataTypes.STRING,
    goals: DataTypes.STRING,
    hits: DataTypes.STRING,
    points: DataTypes.STRING,
    penaltyMinutes: DataTypes.STRING,
    opponnetTeam: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};