const pool = require('../db');

exports.getAllProducts = async (req, res) => {
  const result = await pool.query('SELECT * FROM products');
  res.json(result.rows);
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
  res.json(result.rows[0]);
};

exports.createProduct = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  const result = await pool.query(
    'INSERT INTO products (name, description, price, imageUrl) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, description, price, imageUrl]
  );
  res.status(201).json(result.rows[0]);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl } = req.body;
  const result = await pool.query(
    'UPDATE products SET name = $1, description = $2, price = $3, imageUrl = $4 WHERE id = $5 RETURNING *',
    [name, description, price, imageUrl, id]
  );
  if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
  res.json(result.rows[0]);
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
  if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted' });
};
