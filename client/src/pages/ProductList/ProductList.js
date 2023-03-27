import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


function ProductList(props) {
  const [user, setUser] = useState([]);
  const editProduct = (productId) => {
    props.history.push(`/${productId}`);
  };
  const deleteProduct = (productId) => {
    axios.delete(`http://localhost:8000/api/users/${productId}`).then((res) => {
      console.log(res);
      console.log(res.data);
      if (res.data === 200) {
        setUser((prevAddProduct) => ({
          ...prevAddProduct,
          successMessage: "Product deleted successfully",
        }));
        console.log("Product deleted successfully");
        window.location.href = "/product-list";
      }
    });
  };
  useEffect(() => {
    fetch("http://localhost:8000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUser(data.users);
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
          {user.map((user) => (
            <tr key={user.productId}>
              <td>{user.productName}</td>
              <td>{user.scrumMasterName}</td>
              <td>{user.productOwnerName}</td>
              <td>{user.Developers.join(' , ')}</td>
              <td>{user.startDate}</td>
              <td>{user.methodology}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => editProduct(user.productId)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(user.productId)}
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
