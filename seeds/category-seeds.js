//Import Category model from the models
const { Category } = require('../models');

//Define entries data for Category table
const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData); //Create entries in Category table

module.exports = seedCategories; //Export the function to create the entries for Category table
