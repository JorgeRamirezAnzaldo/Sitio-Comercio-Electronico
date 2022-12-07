const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  
  try {
    //Find all tags
    const allTags = await Tag.findAll({
      include: {model: Product}, //Include its associated Product data
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  //Find one tag by its id value
  try {
    const SingleTag = await Tag.findByPk(req.params.id, {
      include: {model: Product}, //Include its associated Product data
    })
    res.status(200).json(SingleTag);
  } catch (err) {
    res.status(500).json(err);
  } 
});

router.post('/', async (req, res) => {
  //Create a new tag
  try {
    const NewTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(NewTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  //Update a tag's name by its id value
  try {
    const UpdateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(UpdateTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  //Delete on tag by its id value
  try {
    const DeleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(DeleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
