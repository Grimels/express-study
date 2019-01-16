var express = require('express');
var router = express.Router();
const productManager = require('../managers/products');

router.param('id', (req, res, next, id) => {
  productManager
    .getProduct(parseInt(id))
    .then(product => {
      res.context = { product };
      next();
    })
    .catch(err => {
      next(err);
    });
});

/* GET home page. */
router.get('/products', (req, res, next) => {
  const page = parseInt(req.query['_page']) || 1;
  const limit = parseInt(req.query['_limit']) || 2;

  productManager
    .getProducts(page, limit)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
});

router.get('/products/:id', (req, res, next) => {
  res.send(res.context.product);
});

router.post('/products', (req, res, next) => {
  const { name, category, image, price, amount } = req.body;

  const newProduct = {
    name,
    currency,
    category,
    image,
    price,
    amount
  };

  productManager
    .createProduct(newProduct)
    .then(product => {
      res.send(product);
    })
    .catch(err => next(err));
});

router.patch('/products/:id', (req, res, next) => {
  productManager
    .updateProduct(res.context.product, req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => next(err));
});

router.delete('/products/:id', (req, res, next) => {
  productManager
    .deleteProduct(res.context.product)
    .then(() => {
      res.send('Successfully deleted ');
    })
    .catch(err => next(err));
});

module.exports = router;
