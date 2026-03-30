import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./components/Table";

function App() {
  const [products, setProducts] = useState([]);

  const API = "http://localhost:5000/api/products";

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete (soft delete)
  const deleteProduct = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchProducts();
  };

  // Restore product
  const restoreProduct = async (id) => {
    await axios.put(`${API}/restore/${id}`);
    fetchProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Management</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th onClick={() => {}}>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                {p.deleted_at ? "Deleted" : "Active"}
              </td>
              <td>
                {!p.deleted_at ? (
                  <button onClick={() => deleteProduct(p.id)}>
                    Delete
                  </button>
                ) : (
                  <button onClick={() => restoreProduct(p.id)}>
                    Restore
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h3>Reusable Table Component</h3>
      <Table columns={["id", "name", "price"]} data={products} />
    </div>
  );
}

export default App;