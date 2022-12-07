//Import router from express
const router = require('express').Router();
//Import Tag, Product and ProductTag models
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//GET route to get all tags
router.get('/', async (req, res) => {
  try {
    //Find all tags
    const allTags = await Tag.findAll({
      include: [{model: Product}] //Include its associated Product data
    });
    res.status(200).json(allTags); //Respond with status 202 and all tags found
  } catch (err) { //Catch any error
    res.status(500).json(err); //Respond with status 500 if there is a problem/error
  }
});

//GET route to get a single tag
router.get('/:id', async (req, res) => {
  try {
    //Find one tag by its id value
    const SingleTag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}] //Include its associated Product data
    })
    if (!SingleTag) { //If no tag was found for the id
      res.status(404).json({ message: 'No tag found with this id!' }); //Respond with status 404 and proper message
      return;
    }
    res.status(200).json(SingleTag); //Respond with status 200 and the tag found
  } catch (err) { //Catch any error
    res.status(500).json(err); //Respond with status 500 if there is a problem/error
  } 
});

//POST route to create a new tag
router.post('/', async (req, res) => {
  try {
    //Create a new tag
    const NewTag = await Tag.create({
      tag_name: req.body.tag_name, //Get the tag name from the request body
    });
    res.status(200).json(NewTag); //Respond with status 200 and the result from the tag creation
  } catch (err) { //Catch any error
    res.status(500).json(err); //Respond with status 500 if there is a problem/error
  }
});

//PUT route to update a tag 
router.put('/:id', async (req, res) => {
  try {
    //Update a tag's name by its id value
    const UpdateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id, //Get the tag id from the request parameters
      },
    });
    if (!UpdateTag[0]) { //If no tag was found for the id
      res.status(404).json({ message: 'No tag found with this id!' }); //Respond with status 404 and proper message
      return;
    }
    res.status(200).json(UpdateTag); //Respond with status 200 and the result from the tag update
  } catch (err) { //Catch any error
    res.status(500).json(err); //Respond with status 500 if there is a problem/error
  }
});

//DELETE route to delete a tag
router.delete('/:id', async (req, res) => {
  try {
    //Delete on tag by its id value
    const DeleteTag = await Tag.destroy({
      where: {
        id: req.params.id, //Get the tag id from the request parameters
      },
    });
    if (!DeleteTag) { //If no tag was found for the id
      res.status(404).json({ message: 'No tag found with this id!' }); //Respond with status 404 and proper message
      return;
    }
    res.status(200).json(DeleteTag); //Respond with status 200 and the result from the tag deletion
  } catch (err) { //Catch any error
    res.status(500).json(err); //Respond with status 500 if there is a problem/error
  }
});

module.exports = router; //Export router with all the routes
