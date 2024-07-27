'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Treatment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Treatment.init({
    id: {
      type: UUIDV4,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    consultationId: DataTypes.UUID,
    petShopId: DataTypes.UUID,
    type: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Treatment',
  });
  return Treatment;
};