import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Table } from "react-bootstrap";
import Header from "../header/header";

const API_BASE = "http://localhost:5000/api/admin/products";
const IMAGE_BASE = "http://localhost:5000";

const getAdminAxiosConfig = () => {
  const token = localStorage.getItem("adminToken");
  return {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  };
};

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // dynamic categories
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    ProductName: "",
    ProductPrice: "",
    Category: "",
    Zodiac: "",
    Description: "",
    Photos: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUnauthorized = () => {
    alert("Session expired. Please login again.");
    localStorage.clear();
    window.location.href = "/login";
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_BASE, getAdminAxiosConfig());
      setProducts(res.data);

      // dynamically extract unique categories
      const uniqueCategories = [
        ...new Set(res.data.map((p) => p.Category).filter((c) => c)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      if (error.response?.status === 401) handleUnauthorized();
      else console.error("Fetch Products Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // preview local image before saving
    const previewUrl = URL.createObjectURL(file);
    setFormData({
      ...formData,
      Photos: previewUrl, // temporarily store preview
      _file: file, // store the actual file if needed for upload
    });
  };

  const openAddModal = () => {
    setEditMode(false);
    setFormData({
      ProductName: "",
      ProductPrice: "",
      Category: "",
      Zodiac: "",
      Description: "",
      Photos: "",
    });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditMode(true);
    setSelectedId(product._id);
    setFormData(product);
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`${API_BASE}/${selectedId}`, formData, getAdminAxiosConfig());
      } else {
        await axios.post(API_BASE, formData, getAdminAxiosConfig());
      }
      fetchProducts();
      setShowModal(false);
    } catch (error) {
      if (error.response?.status === 401) handleUnauthorized();
      else console.error("Save Product Error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`, getAdminAxiosConfig());
      fetchProducts();
    } catch (error) {
      if (error.response?.status === 401) handleUnauthorized();
      else console.error("Delete Product Error:", error);
    }
  };

  // bulletproof image URL
  const getImageUrl = (path) => {
    if (!path) return `${IMAGE_BASE}/images/placeholder.png`;
    if (path.startsWith("http")) return path;

    let cleanPath = path.replace(/^\/?images\/?/, "");
    return `${IMAGE_BASE}/images/${cleanPath}`;
  };

  return (
    <div className="p-4">
      <Header />

      <Button onClick={openAddModal}>+ Add Product</Button>

      <Table striped bordered className="mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Zodiac</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No Products
              </td>
            </tr>
          )}

          {products.map((p) => (
            <tr key={p._id}>
              <td>
                <img
                  src={getImageUrl(p.Photos)}
                  alt={p.ProductName}
                  width="60"
                  height="60"
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `${IMAGE_BASE}/placeholder.png`;
                  }}
                />
              </td>
              <td>{p.ProductName}</td>
              <td>{p.ProductPrice}</td>
              <td>{p.Category}</td>
              <td>{p.Zodiac}</td>
              <td>
                <Button size="sm" onClick={() => openEditModal(p)}>
                  Edit
                </Button>{" "}
                <Button size="sm" variant="danger" onClick={() => handleDelete(p._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSave}>
            {formData.Photos && (
              <div className="text-center mb-3">
                <img
                  src={getImageUrl(formData.Photos)}
                  alt="Preview"
                  width="120"
                  height="120"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}

            <Form.Group className="mb-2">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                name="ProductName"
                value={formData.ProductName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="ProductPrice"
                value={formData.ProductPrice}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Category select dynamically populated */}
            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="Category"
                value={formData.Category}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((c, idx) => (
                  <option key={idx} value={c}>
                    {c}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Zodiac select */}
            <Form.Group className="mb-2">
              <Form.Label>Zodiac</Form.Label>
              <Form.Select
                name="Zodiac"
                value={formData.Zodiac}
                onChange={handleChange}
              >
                <option value="">-- Select Zodiac --</option>
                <option value="Aries">Aries</option>
                <option value="Taurus">Taurus</option>
                <option value="Gemini">Gemini</option>
                <option value="Cancer">Cancer</option>
                <option value="Leo">Leo</option>
                <option value="Virgo">Virgo</option>
                <option value="Libra">Libra</option>
                <option value="Scorpio">Scorpio</option>
                <option value="Sagittarius">Sagittarius</option>
                <option value="Capricorn">Capricorn</option>
                <option value="Aquarius">Aquarius</option>
                <option value="Pisces">Pisces</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Choose Product Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileSelect} />
              <small className="text-muted">
                Image must exist in: dashboard/public/images/product/
              </small>
            </Form.Group>

            <Button type="submit" className="mt-3">
              {editMode ? "Update" : "Save"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Product;
