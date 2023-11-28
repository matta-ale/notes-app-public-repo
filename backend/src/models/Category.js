const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};