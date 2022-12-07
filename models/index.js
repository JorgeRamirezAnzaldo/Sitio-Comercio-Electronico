//Import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id", //Define custom key to match the model
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id", //Define custom key to match the model
  onDelete: "Cascade",
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id", //Define custom keys to match the model
  otherKey: "tag_id",
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id", //Define custom keys to match the model
  otherKey: "product_id",
})

//Export models with associations
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
