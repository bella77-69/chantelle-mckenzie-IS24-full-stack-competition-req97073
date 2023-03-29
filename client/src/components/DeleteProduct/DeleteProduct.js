import React, { useState } from "react";
import axios from "axios";
import "./deleteProduct.scss";

function DeleteProduct(props) {
  const productId = props.match.params.productId;
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/products/${productId}`)
      .then((res) => {
        console.log(res);

        setSuccessMessage("Product deleted successfully");
        window.location.href = "/product-list";
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const handleCancel = () => {
    window.location.href = "/product-list";
  };

  return (
    <div className="delete">
      <h3 className="h3 text-center mb-4 mt-3">Delete Product</h3>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <div className="delete-message">
        Are you sure you want to delete this product?
      </div>
      <div className="btn-row">
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
        <button className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteProduct;
