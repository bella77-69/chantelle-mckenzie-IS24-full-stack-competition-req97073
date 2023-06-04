import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "./productList.scss";

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
      <h3 className="h3 text-center mb-4 mt-3">Edit / Delete Product</h3>
      <div className="table-responsive">
        <Table>
          <Thead className="table-header">
            <Tr>
              <Th className="column-width-20">Product Name</Th>
              <Th className="column-width-15">Scrum Master</Th>
              <Th className="column-width-15">Product Owner</Th>
              <Th className="column-width-15">Developers</Th>
              <Th className="column-width-10">Start Date</Th>
              <Th className="column-width-15">Methodology</Th>
              <Th className="column-width-10">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {product.map((product) => (
              <Tr key={product.productId}>
                <Td className="column-width-20">{product.productName}</Td>
                <Td className="column-width-15">{product.scrumMasterName}</Td>
                <Td className="column-width-15">{product.productOwnerName}</Td>
                <Td className="column-width-15">
                  {product.Developers.map((developer, index) => (
                    <div key={index}>{developer}</div>
                  ))}
                </Td>
                <Td className="column-width-10">{product.startDate}</Td>
                <Td className="column-width-15">{product.methodology}</Td>
                <Td className="column-width-10">
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
