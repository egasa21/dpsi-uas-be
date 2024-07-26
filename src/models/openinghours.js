'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OpeningHours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OpeningHours.belongsTo(models.PetShop, { foreignKey: 'petShopId', as: 'petShop' });
    }
  }
  OpeningHours.init({
    id: {
      type: UUIDV4,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    day: DataTypes.STRING,
    openingTime: DataTypes.TIME,
    closingTime: DataTypes.TIME,
    petShopId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'OpeningHours',
  });
  return OpeningHours;
};