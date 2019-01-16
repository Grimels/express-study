const { getConnection } = require('../db');
const bookshelf = getConnection();

const Products = bookshelf.Model.extend({
  tableName: 'products'
});

module.exports = Products;

/*

const getProducts = (start, end) => {
  return db.any('SELECT * FROM products WHERE id BETWEEN $1 AND $2', [
    start,
    end
  ]);
};

const getProduct = id => {
  return db.one('SELECT * FROM products WHERE id = $1', id);
};

const createProduct = product => {
  return db.one(
    'INSERT INTO products(name, currency, category, image, price, amount) VALUES (${name}, ${currency}, ${category}, ${image}, ${price}, ${amount}) returning *',
    product
  );
};

const deleteProduct = id => {
  return db.one('DELETE FROM products WHERE id = $1 returning id', id);
};

function Model(modelFields) {
  this.modelFields = modelFields;

  this.getProducts = getProducts;
  this.getProduct = getProduct;
  this.createProduct = createProduct;
  this.deleteProduct = deleteProduct;

  this.updateProduct = (id, fields) => {
    if (!id || !fields || fields.length === 0) return null;

    const values = [];
    const query = Object.keys(fields)
      .filter(field => this.modelFields.includes(field))
      .map((field, idx) => {
        values.push(fields[field]);
        return `${field} = $${idx + 2}`;
      })
      .join(', ');

    return db.one(
      `UPDATE products SET ${query} WHERE id = $1 RETURNING *;`,
      [id, ...values]
    );
  };
}

const ProductModel = new Model([
  'name',
  'amount',
  'currency',
  'price',
  'image',
  'category'
]);

module.exports = ProductModel;
*/
