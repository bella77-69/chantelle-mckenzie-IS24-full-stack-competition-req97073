import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import './productList.scss';


function ProductList(props) {
  const [product, setProduct] = useState([]);


  const editProduct = (productId) => {
    window.location.href = `/edit/${productId}`;
  };

  const deleteProduct = (productId) => {
    window.location.href = `/delete/${productId}`;
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
    <div className="product table">
      <h3 className="h3 text-center mb-4 mt-3">Product List</h3>
      <div className="table-responsive">
      <Table>
        <Thead className="table-header">
          <Tr>
            <Th>Product Name</Th>
            <Th>Scrum Master</Th>
            <Th>Product Owner</Th>
            <Th>Developers</Th>
            <Th>Start Date</Th>
            <Th>Methodology</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {product.map((product) => (
            <Tr key={product.productId}>
              <Td>{product.productName}</Td>
              <Td>{product.scrumMasterName}</Td>
              <Td>{product.productOwnerName}</Td>
              <Td>{product.Developers}</Td>
              <Td>{product.startDate}</Td>
              <Td>{product.methodology}</Td>
              <Td>
           <div className="btn-row">
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(product.productId)}
                >
                  Delete
                </button>
                </div>
                <div className="btn-row">
                <button
                  className="btn btn-primary"
                  onClick={() => editProduct(product.productId)}
                >
                  Edit
                </button>
                </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </div>
    </div>
  );
}

export default ProductList;
