const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll(
  {include: [Product]})
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      Product
    ]
  }).then((Category) => res.json(Category))
  .catch((err) => res.status(400).json(err))
});
  // be sure to include its associated Products

router.post('/', (req, res) => {
    // create a new category
  Category.create(req.body)
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
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
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((Category) => res.status(200).json(Category))
  .catch((err) => res.status(400).json(err))
});

module.exports = router;
