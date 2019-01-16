const Products = require('../models/products');

const getProducts = (page, limit) =>
  Products.query('orderBy', 'id', 'ASC').fetchPage({
    pageSize: limit,
    page: page
  });

const getProduct = id => Products.forge('id', id).fetch();

const deleteProduct = product => product.destroy();

const createProduct = product => Products.forge(product).save();

const updateProduct = (product, fields) =>
  product.save(fields, { method: 'update' });

module.exports = {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct
};
