const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
  // be sure to include its associated Product data
  router.get('/', (req, res) => {
    Tag.findAll(
    {include: [Product,]})
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  });



  // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id', (req, res) => {
    // find one category by its `id` value
    Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [
        Product,
      ]
    }).then((Category) => res.json(Category))
    .catch((err) => res.status(400).json(err))
  });


  router.post('/', (req, res) => {
    // create a new category
  Tag.create(req.body)
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => res.status(200).json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((Category) => res.status(200).json(Category))
  .catch((err) => res.status(400).json(err))
});

module.exports = router;
