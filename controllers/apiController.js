const productManager = require('../managers/products');

/*const {
  products
} = require('/home/NIX/malyarenko/projects/react-practice-test-shop/src/db/db.json');*/

const getProducts = (req, res, next) => {
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
};

const getProduct = (req, res, next) => {
  //res.send(products.find(prod => prod.id === req.params.id));
  res.send(res.context.product);
};

const createProduct = (req, res, next) => {
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
};

const deleteProduct = (req, res, next) => {
  productManager
    .deleteProduct(res.context.product)
    .then(() => {
      res.send('Successfully deleted ');
    })
    .catch(err => next(err));
};

const updateProduct = (req, res, next) => {
  productManager
    .updateProduct(parseInt(res.context.product.id), req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => next(err));
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct
};
