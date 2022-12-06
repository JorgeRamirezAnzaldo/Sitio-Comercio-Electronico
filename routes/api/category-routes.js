const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    //Find all categories
    const allCategories = await Category.findAll({
      include: {model: Product}, //Include its associated Products
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  } 
});

router.get('/:id', async (req, res) => {
  //Find one category by its id value
  try {
    const SingleCategory = await Category.findByPk(req.params.id, {
      include: {model: Product}, //Include its associated products
    })
    res.status(200).json(SingleCategory);
  } catch (err) {
    res.status(500).json(err);
  } 
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
