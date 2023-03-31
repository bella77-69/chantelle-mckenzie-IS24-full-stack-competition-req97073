import React, { useState, useEffect } from "react";
import "./editProduct.scss";
import EditProductForm from "./EditProductForm";

function EditProduct(props) {
  const [initialProductData, setInitialProductData] = useState({});
  const [editResult, setEditResult] = useState(null);
  const { productId } = props.match.params;

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${productId}`)
      .then((res) => res.json())
      .then((result) => {
        setInitialProductData(result);
      });
  }, [productId]);

  const handleEdit = (data) => {
    const emptyFields = Object.values(data).some((value) => !value);
    if (emptyFields) {
      alert("Please fill all the fields");
    } else {
      fetch(`http://localhost:8000/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          setEditResult(result);
        });
      window.location.href = `/product-list`;
    }
  };

  const backToList = (e) => {
    e.preventDefault();
    window.location.href = "/product-list";
  };

  return (
    <div className="container product">
      <h3 className="h3 text-center mb-4 mt-3">Edit Product</h3>

      <div className="h3 text-center mb-4 mt-3">
        <h3 className="mt-2">Update Users Info</h3>
      </div>
      <div className="card-body">
        <EditProductForm
          initialProductData={initialProductData}
          handleEdit={handleEdit}
          backToList={backToList}
        />
      </div>
      {editResult && (
        <div className="alert alert-success" role="alert">
          {editResult}
        </div>
      )}
    </div>
  );
}

export default EditProduct;
