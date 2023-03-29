import React, { useState } from "react";
import './productView.scss';

function ProductView(props) {
  const [addProduct, setAddProduct] = useState({
    productName: "",
    scrumMasterName: "",
    productOwnerName: "",
    Developers: ["", "", "", "", ""],
    startDate: "",
    methodology: "",
    successMessage: null,
  });

  const [errors, setErrors] = useState({
    productName: "",
    scrumMasterName: "",
    productOwnerName: "",
    startDate: "",
    methodology: "",
  });

  const successPost = () => {
    window.location.href = `/product-list`;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAddProduct((prevAddProduct) => ({
      ...prevAddProduct,
      [id]: id === "Developers" ? value.split("\n") : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: validateInput(id, value),
    }));
  };

  const handleDeveloperChange = (index, value) => {
    setAddProduct((prevAddProduct) => {
      const developers = [...prevAddProduct.Developers];
      developers[index] = value;
      return { ...prevAddProduct, Developers: developers };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      productName: addProduct.productName,
      scrumMasterName: addProduct.scrumMasterName,
      productOwnerName: addProduct.productOwnerName,
      Developers: addProduct.Developers,
      startDate: addProduct.startDate,
      methodology: addProduct.methodology,
    };
    const formIsValid =
      Object.values(errors).every((error) => error === "") &&
      addProduct.productName.trim() &&
      addProduct.scrumMasterName.trim() &&
      addProduct.productOwnerName.trim() &&
      addProduct.Developers.every((developer) => developer.trim()) &&
      addProduct.startDate.trim() &&
      addProduct.methodology.trim();
    if (formIsValid) {
      fetch(`http://localhost:8000/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          setAddProduct(result);
          console.log(result);
        });
      successPost();
    } else {
      alert(
        "Please fill in all required fields and correct errors before submitting."
      );
    }
  };

  const validateInput = (id, value) => {
    switch (id) {
      case "productName":
        return value.trim() ? "" : "Product Name is required";
      case "scrumMasterName":
        return value.trim() ? "" : "Scrum Master Name is required";
      case "productOwnerName":
        return value.trim() ? "" : "Product Owner Name is required";
      case "startDate":
        return value.trim() ? "" : "Start Date is required";
      case "methodology":
        return value.trim() ? "" : "Methodology is required";
      default:
        return "";
    }
  };

  return (
    <div className="container product">
      <h3 className="h3 text-center mb-4 mt-3">Add Product</h3>
      <div className="container">
      <form className="form" onSubmit={handleSubmit}>
      
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            className={`form-control ${errors.productName && "is-invalid"}`}
            id="productName"
            placeholder="Enter Product Name"
            value={addProduct.productName}
            onChange={handleChange}
          />
          {errors.productName && (
            <span className="invalid-feedback">{errors.productName}</span>
          )}

          <label htmlFor="scrumMasterName">Scrum Master Name</label>
          <input
            type="text"
            className={`form-control ${errors.scrumMasterName && "is-invalid"}`}
            id="scrumMasterName"
            placeholder="Enter Scrum Master Name"
            value={addProduct.scrumMasterName}
            onChange={handleChange}
          />
          {errors.productName && (
            <span className="invalid-feedback">{errors.scrumMasterName}</span>
          )}

          <label htmlFor="productOwnerName">Product Owner Name</label>
          <input
            type="text"
            className={`form-control ${
              errors.productOwnerName && "is-invalid"
            }`}
            id="productOwnerName"
            placeholder="Enter Product Owner Name"
            value={addProduct.productOwnerName}
            onChange={handleChange}
          />
          {errors.productName && (
            <span className="invalid-feedback">{errors.productOwnerName}</span>
          )}

          <label htmlFor="Developers">Developers</label>
          {addProduct.Developers.map((developer, index) => (
            <input
              key={index}
              type="text"
              className={`form-control ${errors.Developers && "is-invalid"}`}
              placeholder={`Enter Developer ${index + 1}`}
              value={developer}
              onChange={(e) => handleDeveloperChange(index, e.target.value)}
            />
          ))}
          {errors.Developers && (
            <span className="invalid-feedback">{errors.Developers}</span>
          )}

          <label htmlFor="startDate">Start Date</label>
          <input
            type="text"
            className={`form-control ${errors.startDate && "is-invalid"}`}
            id="startDate"
            placeholder="Enter Start Date"
            value={addProduct.startDate}
            onChange={handleChange}
          />
          {errors.startDate && (
            <span className="invalid-feedback">{errors.startDate}</span>
          )}

          <label htmlFor="methodology">Methodology</label>
          <input
            type="text"
            className={`form-control ${errors.methodology && "is-invalid"}`}
            id="methodology"
            placeholder="Enter Methodology"
            value={addProduct.methodology}
            onChange={handleChange}
          />
          {errors.productName && (
            <span className="invalid-feedback">{errors.methodology}</span>
          )}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>

          <span className="success-message">{addProduct.successMessage}</span>
        </div>
       
      </form>
    </div>
    </div>
   
  );
}

export default ProductView;
