//Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
//Import our database connection from config/connection.js
const sequelize = require('../config/connection');

//Initialize ProductTag model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}

//Set up fields and rules for ProductTag model
ProductTag.init(
  //Define columns for ProductTag 
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      //Reference to the product model using the id
      references: {
        model: "product",
        key: "id",
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      //Reference to the tag model using the id
      references: {
        model: "tag",
        key: "id",
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag', //Define modelName for ProductTag
  }
);

module.exports = ProductTag; //Export ProductTag model
