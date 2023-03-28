import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


function ProductList(props) {
  const [product, setProduct] = useState([]);
  const editProduct = (productId) => {
    props.history.push(`/${productId}`);
  };
  const deleteProduct = (productId) => {
    axios.delete(`http://localhost:8000/api/products/${productId}`).then((res) => {
      console.log(res);
      console.log(res.data);
      if (res.data === 200) {
        setProduct((prevAddProduct) => ({
          ...prevAddProduct,
          successMessage: "Product deleted successfully",
        }));
        console.log("Product deleted successfully");
        window.location.href = "/product-list";
      }
    });
  };
  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.products);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  return (
    <div className="container product-list">
      <h1>Product List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Scrum Master</th>
            <th>Product Owner</th>
            <th>Developers</th>
            <th>Start Date</th>
            <th>Methodology</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.map((product) => (
            <tr key={product.productId}>
              <td>{product.productName}</td>
              <td>{product.scrumMasterName}</td>
              <td>{product.productOwnerName}</td>
              <td>{product.Developers.join(' , ')}</td>
              <td>{product.startDate}</td>
              <td>{product.methodology}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => editProduct(product.productId)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(product.productId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
