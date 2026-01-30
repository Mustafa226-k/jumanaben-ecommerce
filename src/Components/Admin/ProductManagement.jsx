import { useState } from "react";
import "../../style/Admin/ProductManagement.css";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    active: true,
    featured: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleAddProduct = () => {
    if (formData.name && formData.price) {
      if (editingId) {
        setProducts(
          products.map((p) =>
            p.id === editingId ? { ...formData, id: editingId } : p,
          ),
        );
        setEditingId(null);
      } else {
        setProducts([
          ...products,
          { ...formData, id: Date.now(), active: true, featured: false },
        ]);
      }
      setFormData({
        name: "",
        price: "",
        description: "",
        image: "",
        active: true,
        featured: false,
      });
      setShowForm(false);
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEditProduct = (product) => {
    setFormData(product);
    setEditingId(product.id);
    setShowForm(true);
  };

  const toggleActive = (id) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, active: !p.active } : p)),
    );
  };

  const toggleFeatured = (id) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)),
    );
  };

  return (
    <div className="product-management">
      <div className="header-section">
        <h2>📦 Product Management</h2>
        <button
          className="btn-add"
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              name: "",
              price: "",
              description: "",
              image: "",
              active: true,
              featured: false,
            });
          }}
        >
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingId ? "Edit Product" : "Add New Product"}</h3>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleInputChange}
          />
          <div className="form-switches">
            <label className="switch-label">
              Status
              <label className="switch">
                <input
                  type="checkbox"
                  name="active"
                  checked={!!formData.active}
                  onChange={handleInputChange}
                />
                <span className="slider"></span>
              </label>
            </label>

            <label className="switch-label">
              Featured
              <label className="switch">
                <input
                  type="checkbox"
                  name="featured"
                  checked={!!formData.featured}
                  onChange={handleInputChange}
                />
                <span className="slider"></span>
              </label>
            </label>
          </div>
          <button className="btn-submit" onClick={handleAddProduct}>
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </div>
      )}

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <button
                      className={`btn-status ${product.active ? "active" : "inactive"}`}
                      onClick={() => toggleActive(product.id)}
                    >
                      {product.active ? "✓ Active" : "✗ Inactive"}
                    </button>
                  </td>
                  <td>
                    <button
                      className={`btn-feature ${product.featured ? "featured" : ""}`}
                      onClick={() => toggleFeatured(product.id)}
                    >
                      {product.featured ? "⭐ Featured" : "☆ Not Featured"}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No products yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;
