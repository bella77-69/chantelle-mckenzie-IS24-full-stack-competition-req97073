import React, { useState } from "react";
import axios from "axios";

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAddProduct((prevAddProduct) => ({
      ...prevAddProduct,
      [id]: id === 'Developers' ? value.split('\n') : value,
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

    axios
      .post("http://localhost:8000/api/users", data)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data === 200) {
          setAddProduct((prevAddProduct) => ({
            ...prevAddProduct,
            successMessage: "Product added successfully",
          }));
          console.log("Product added successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container product-list">
      Product List Page
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            placeholder="Enter Product Name"
            value={addProduct.productName}
            onChange={handleChange}
          />

          <label htmlFor="scrumMasterName">Scrum Master Name</label>
          <input
            type="text"
            className="form-control"
            id="scrumMasterName"
            placeholder="Enter Scrum Master Name"
            value={addProduct.scrumMasterName}
            onChange={handleChange}
          />

          <label htmlFor="productOwnerName">Product Owner Name</label>
          <input
            type="text"
            className="form-control"
            id="productOwnerName"
            placeholder="Enter Product Owner Name"
            value={addProduct.productOwnerName}
            onChange={handleChange}
          />

          <label htmlFor="Developers">Developers</label>
          {addProduct.Developers.map((developer, index) => (
            <input
              key={index}
              type="text"
              className="form-control"
              placeholder={`Enter Developer ${index + 1}`}
              value={developer}
              onChange={(e) => handleDeveloperChange(index, e.target.value)}
            />
          ))}
          {/* <textarea
            className="form-control"
            id="Developers"
            placeholder="Enter Developers (separated by new line)"
            value={addProduct.Developers}
            onChange={handleChange}
            rows="5"
          /> */}

          <label htmlFor="startDate">Start Date</label>
          <input
            type="text"
            className="form-control"
            id="startDate"
            placeholder="Enter Start Date"
            value={addProduct.startDate}
            onChange={handleChange}
          />

          <label htmlFor="methodology">Methodology</label>
          <input
            type="text"
            className="form-control"
            id="methodology"
            placeholder="Enter Methodology"
            value={addProduct.methodology}
            onChange={handleChange}
            />

            <button type="submit" className="btn btn-primary">
                Submit
            </button>

            <div className="success-message">{addProduct.successMessage}</div>
        </div>
        </form>
    </div>
    );
}

export default ProductView;

