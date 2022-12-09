//Import the functions required to create entries in all tables/models
const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

//Import sequelize connection
const sequelize = require('../config/connection');

//Create function to populate all entries
const seedAll = async () => {
  await sequelize.sync({ force: true }); //Sync sequelize models to the database
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories(); //Populate entries for the Category table
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProducts(); //Populate entries for the Product table
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedTags(); //Populate entries for the Tag table
  console.log('\n----- TAGS SEEDED -----\n');

  await seedProductTags(); //Populate entries for the ProductTag table
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0); //Exit
};

seedAll(); //Call function to populate all tables with entries
 