//Import router from express
const router = require('express').Router();
//Import category routes from the proper file
const categoryRoutes = require('./category-routes');
//Import product routes from the proper file
const productRoutes = require('./product-routes');
//Import tag routes from the proper file
const tagRoutes = require('./tag-routes');

//Use the category routes with /categories 
router.use('/categories', categoryRoutes);
//Use the products routes with /products
router.use('/products', productRoutes);
//Use the tags routes with /tags
router.use('/tags', tagRoutes);

module.exports = router; //Export router
