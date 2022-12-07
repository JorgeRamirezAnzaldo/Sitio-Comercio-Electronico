//Import router from express
const router = require('express').Router();
//Import Product, Category, Tag and ProductTag models
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

//Get all products
router.get('/', async (req, res) => {
  try {
    //Find all products
    const allProducts = await Product.findAll({
      include: [{model: Category}, {model:Tag}] //Include its associated Category and Tag data
    });
    res.status(200).json(allProducts); //Respond with status 200 and the with all the products found
  } catch (err) { //Catch any error
    res.status(500).json(err); //Respond with status 500 if there is a problem/error
  }
});

//GET route to get one product
router.get('/:id', async (req, res) => {
  try {
    //Find one product by its id value
    const SingleProduct = await Product.findByPk(req.params.id, {
      include: [{model: Category}, {model:Tag}] //Include its associated Category and Tag data
    })
    if (!SingleProduct) { //If no product was found for the id
      res.status(404).json({ message: 'No product found with this id!' }); //Respond with status 404 and proper message
      return;
    }
    res.status(200).json(SingleProduct); //Respond with status 200 and the product found
  } catch (err) { //Catch any error
    res.status(500).json(err); //Respond with status 500 if there is a problem/error
  } 
});

//POST route to create a new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  //Create a new product
  Product.create(req.body) //Use the request body to create a product
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => { //Catch any error
      console.log(err);
      res.status(400).json(err); //Respond with status 400 and proper error
    });
});

//PUT route to update a product
router.put('/:id', (req, res) => {
  //Update product data by its id value
  Product.update(req.body, {
    where: {
      id: req.params.id, //Get product id from the request parameters
    },
  })
    .then((product) => {
      //Find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      //Get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      //Create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      //Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      //Run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }), //Delete tags for the product that are not necessary
        ProductTag.bulkCreate(newProductTags), //Create new tags for the product
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => { //Catch any error
      res.status(400).json(err); //Respond with status 400 and proper error
    });
});

//DELETE route to delete a product
router.delete('/:id', async (req, res) => {
  try {
    //Delete one product by its id value
    const DeleteProduct = await Product.destroy({
      where: {
        id: req.params.id, //Get the product id from the request parameters
      },
    });
    if (!DeleteProduct) { //If no product was found for the id
      res.status(404).json({ message: 'No product found with this id!' }); //Respond with status 404 and proper message
      return;
    }
    res.status(200).json(DeleteProduct); //Respond with status 200 and result from product deletion
  } catch (err) { //Catch any error
    res.status(500).json(err); //Respond with status 500 if there is a problem/error
  }
});

module.exports = router; //Export router with all the routes
