const pool = require("../db");

exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Product not found" });
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error in getProductById:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const result = await pool.query(
      "INSERT INTO products (name, description, price, imageUrl) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, price, imageUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error in createProduct:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl } = req.body;
    const result = await pool.query(
      "UPDATE products SET name = $1, description = $2, price = $3, imageUrl = $4 WHERE id = $5 RETURNING *",
      [name, description, price, imageUrl, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Product not found" });
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).json({ message: "Server error" });
  }
};
