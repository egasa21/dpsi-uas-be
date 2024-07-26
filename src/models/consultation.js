'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Consultation.belongsTo(models.User, { foreignKey: 'userId' });
      Consultation.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
    }
  }
  Consultation.init({
    id: {
      type: UUIDV4,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    doctorId: DataTypes.UUID,
    consultationDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Consultation',
  });
  return Consultation;
};