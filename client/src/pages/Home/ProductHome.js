import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./productHome.scss";

function ProductHome(props) {
  const [product, setProduct] = useState([]);

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
      <h3 className="h3 text-center mb-4 mt-3">Product Home</h3>
      <div className="table-responsive">
        <Table>
          <Thead className="table-header">
            <Tr>
              <Th>Product #</Th>
              <Th>Product Name</Th>
              <Th>Scrum Master</Th>
              <Th>Product Owner</Th>
              <Th>Developers</Th>
              <Th>Start Date</Th>
              <Th>Methodology</Th>
            </Tr>
          </Thead>
          <Tbody>
            {product.map((product) => (
              <Tr key={product.productId}>
                <Td>{product.productId}</Td>
                <Td>{product.productName}</Td>
                <Td>{product.scrumMasterName}</Td>
                <Td>{product.productOwnerName}</Td>
                <Td className="table-developer">
                  {product.Developers.join(",")}
                </Td>
                <Td>{product.startDate}</Td>
                <Td>{product.methodology}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProductHome;
