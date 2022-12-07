//Import router from express
const router = require('express').Router();
//Import Category and Product models
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//GET Route to get all categories
router.get('/', async (req, res) => {
  try {
    //Find all categories
    const allCategories = await Category.findAll({
      include: {model: Product}, //Include its associated Products using Product model
    });
    res.status(200).json(allCategories); //Respond with status 200 and all categories found
  } catch (err) { //Catch any error
    res.status(500).json(err); //Respond with status 500 if there is a problem/error
  } 
});

//GET route to get a single category
router.get('/:id', async (req, res) => {
  try {
    //Find one category by its id value
    const SingleCategory = await Category.findByPk(req.params.id, {
      include: {model: Product}, //Include its associated products using Product model
    })
    if (!SingleCategory) { //If no category was found for the id
      res.status(404).json({ message: 'No category found with this id!' }); //Respond with status 404 and proper message
      return;
    }
    res.status(200).json(SingleCategory); //Respond with status 200 and the category found
  } catch (err) { //Catch any error
    res.status(500).json(err); //Respond with status 500 if there is a problem/error
  } 
});

//POST route to create a new category
router.post('/', async (req, res) => {
  try {
    //Create a new category
    const NewCategory = await Category.create({
      category_name: req.body.category_name, //Get the category name from the request body
    });
    res.status(200).json(NewCategory); //Respond with status 200 and the new category created
  } catch (err) { //Catch any error
    res.status(500).json(err); //Respond with status 500 if there is a problem/error
  }
});

//PUT route to update a category
router.put('/:id', async (req, res) => {
  try {
    //Update a category by its id value
    const UpdateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id, //Get the category id to update from the request parameters
      },
    });
    if (!UpdateCategory[0]) { //If no category was found for the id
      res.status(404).json({ message: 'No category found with this id!' }); //Respond with status 404 and proper message
      return;
    }
    res.status(200).json(UpdateCategory); //Respond with status 200 and the result from the update
  } catch (err) { //Catch any error
    res.status(500).json(err); //Respond with status 500 if there is a problem/error
  }
});

//DELETE route to delete a category
router.delete('/:id', async (req, res) => {
  try {
    //Delete a category by its id value
    const DeleteCategory = await Category.destroy({
      where: {
        id: req.params.id, //Get the category id from the request parameters
      },
    });
    if (!DeleteCategory) { //If no category was found for the id
      res.status(404).json({ message: 'No category found with this id!' }); //Respond with status 404 and proper message
      return;
    }
    res.status(200).json(DeleteCategory); //Respond with status 200 and the result from the deletion
  } catch (err) { //Catch any error
    res.status(500).json(err); //Respond with status 500 if there is a problem/error
  }
});

module.exports = router; //Export the router with all the routes
