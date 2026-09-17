const { pool } = require('../config/database');

const ProductModel = {
  async findAll() {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create(name, price, stock) {
    const query = 'INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *';
    const result = await pool.query(query, [name, price, stock]);
    return result.rows[0];
  },

  async update(id, name, price, stock) {
    const query = 'UPDATE products SET name = $1, price = $2, stock = $3 WHERE id = $4 RETURNING *';
    const result = await pool.query(query, [name, price, stock, id]);
    return result.rows[0];
  },

  async delete(id) {
    const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
};

module.exports = ProductModel;