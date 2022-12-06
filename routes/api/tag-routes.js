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

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
