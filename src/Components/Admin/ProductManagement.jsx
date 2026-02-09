import { useState , useEffect} from "react";
import "../../style/Admin/ProductManagement.css";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../../services/adminProduct.service";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    isAvaliable: true,
    isHero: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imageFile, setImageFile] = useState(null);
const [saving, setSaving] = useState(false);



  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const uploadImageToBackend = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("http://localhost:5000/api/upload/image", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  const data = await res.json();
  return data.imageUrl;
};


 const handleAddProduct = async () => {
  if (!formData.name || !formData.price || !formData.category) {
    alert("Fill all required fields");
    return;
  }

  try {
    setSaving(true); // 🔹 START button loading

    let imageUrl = formData.image;

    if (imageFile) {
      imageUrl = await uploadImageToBackend(imageFile);
    }

    const productData = {
      ...formData,
      image: imageUrl,
    };

    if (editingId) {
      await updateProduct(editingId, productData);
      setEditingId(null);
    } else {
      await addProduct(productData);
    }

    const updated = await getAllProducts();
    setProducts(updated);

    setShowForm(false);
    setImageFile(null);
  } catch (err) {
    console.error(err);
    alert("Failed to save product");
  } finally {
    setSaving(false); // 🔹 STOP button loading
  }
};



  const handleDeleteProduct = async (id) => {
  await deleteProduct(id);
  const updated = await getAllProducts();
  setProducts(updated);
};

  const handleEditProduct = (product) => {
    setFormData(product);
    setEditingId(product.id);
    setShowForm(true);
  };

 const toggleAvailable = async (product) => {
  await updateProduct(product.id, {
    ...product,
    isAvaliable: !product.isAvaliable,
  });

  const updated = await getAllProducts();
  setProducts(updated);
};

const toggleHero = async (product) => {
  await updateProduct(product.id, {
    ...product,
    isHero: !product.isHero,
  });

  const updated = await getAllProducts();
  setProducts(updated);
};

  useEffect(() => {
  const loadProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };
  loadProducts();
}, []);


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
                        category: "",
                        description: "",
                        image: "",
                        isAvaliable: true,
                        isHero: false,
                      });
setImageFile(null);

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
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="girls">Girl</option>
            <option value="women">Women</option>
            <option value="boys">Boy</option>
          </select>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
          <input
  type="file"
  accept="image/*"
  onChange={(e) => setImageFile(e.target.files[0])}
/>

          {imageFile && (
  <img
    src={URL.createObjectURL(imageFile)}
    alt="Preview"
    style={{ maxWidth: "200px", marginTop: "10px" }}
  />
)}


          <div className="form-switches">
            <label className="switch-label">
              Available
              <label className="switch">
                <input
                  type="checkbox"
                  name="isAvaliable"
                  checked={!!formData.isAvaliable}
                  onChange={handleInputChange}
                />
                <span className="slider"></span>
              </label>
            </label>

            <label className="switch-label">
              Hero
              <label className="switch">
                <input
                  type="checkbox"
                  name="isHero"
                  checked={!!formData.isHero}
                  onChange={handleInputChange}
                />
                <span className="slider"></span>
              </label>
            </label>
          </div>
         <button
  className="btn-submit"
  onClick={handleAddProduct}
  disabled={saving}
>
  {saving
    ? "Saving..."
    : editingId
    ? "Update Product"
    : "Add Product"}
</button>

        </div>
      )}

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Avaliable</th>
              <th>Hero</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                  {product.image && (
  <img
    src={product.image}
    alt={product.name}
    style={{ width: "60px", height: "60px", objectFit: "cover" }}
  />
)}


                  </td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <button
                      className={`btn-status ${product.isAvaliable ? "active" : "inactive"}`}
                      onClick={() => toggleAvailable(product)}
                    >
                      {product.isAvaliable ? "✓ Available" : "✗ Unavailable"}
                    </button>
                  </td>
                  <td>
                    <button
                      className={`btn-feature ${product.isHero ? "featured" : ""}`}
                      onClick={() => toggleHero(product)}
                    >
                      {product.isHero ? "⭐ Hero" : "☆ Not Hero"}
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
