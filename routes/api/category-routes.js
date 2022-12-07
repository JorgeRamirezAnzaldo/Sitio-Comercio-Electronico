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
    if (!SingleCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(SingleCategory);
  } catch (err) {
    res.status(500).json(err);
  } 
});

router.post('/', async (req, res) => {
  //Create a new category
  try {
    const NewCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(NewCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  //Update a category by its id value
  try {
    const UpdateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!UpdateCategory[0]) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(UpdateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  //Delete a category by its id value
  try {
    const DeleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!DeleteCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(DeleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
