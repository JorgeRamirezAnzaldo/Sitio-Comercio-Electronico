//Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
//Import our database connection from config/connection.js
const sequelize = require('../config/connection');

//Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

//Set up fields and rules for Product model
Product.init(
  //Define columns for Product
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }, 
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      //Reference to the category model using the id
      references: { 
        model: "category",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product', //Define modelName for Product
  }
);

module.exports = Product; //Export Product model
