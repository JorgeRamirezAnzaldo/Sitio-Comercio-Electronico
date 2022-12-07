//Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
//Import our database connection from config/connection.js
const sequelize = require('../config/connection.js');

//Initialize Category model (table) by extending off Sequelize's Model class
class Category extends Model {} 

//Set up fields and rules for Category model
Category.init(
  //Define columns for Category
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }, 
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category', //Define modelName for Category
  }
);

module.exports = Category; //Export Category Model
