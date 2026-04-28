import { useState } from "react";
import { MdAutoAwesome } from "react-icons/md";
import axios from "axios";
import "./ProductForm.css";

const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!productName.trim()) {
      setError("Please enter a product name first");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3001/api/generate-description",
        { productName }
      );
      setDescription(response.data.description);
    } catch (err) {
      setError("Failed to generate description. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName.trim() || !description.trim()) return;
    alert(`Product Submitted!\n\nName: ${productName}\nDescription: ${description}`);
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <div className="header-icon">
            <MdAutoAwesome />
          </div>
          <h1>AI Product Creator</h1>
          <p>Generate compelling product descriptions with AI</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              id="productName"
              type="text"
              placeholder="e.g. Wireless Bluetooth Headphones"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <div className="textarea-wrapper">
              <textarea
                id="description"
                placeholder="Click the ✨ icon to generate a description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
                rows={5}
              />
              <button
                type="button"
                className={`generate-btn ${isGenerating ? "generating" : ""}`}
                onClick={handleGenerate}
                disabled={isGenerating}
                title="Generate description with AI"
              >
                {isGenerating ? (
                  <span className="spinner"></span>
                ) : (
                  <MdAutoAwesome />
                )}
              </button>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
