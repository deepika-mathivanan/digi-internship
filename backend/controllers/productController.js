const db = require("../config/db");

// GET
exports.getProducts = (req, res) => {
  db.query("SELECT * FROM products WHERE deleted_at IS NULL", (err, result) => {
    res.json(result);
  });
};

// POST
exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  db.query(
    "INSERT INTO products (name, price) VALUES (?, ?)",
    [name, price],
    () => res.send("Product added")
  );
};

// PUT
exports.updateProduct = (req, res) => {
  const { name, price } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE products SET name=?, price=? WHERE id=?",
    [name, price, id],
    () => res.send("Updated")
  );
};

// DELETE (SOFT DELETE)
exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE products SET deleted_at = NOW() WHERE id=?",
    [id],
    () => res.send("Soft deleted")
  );
};

// RESTORE
exports.restoreProduct = (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE products SET deleted_at = NULL WHERE id=?",
    [id],
    () => res.send("Restored")
  );
};