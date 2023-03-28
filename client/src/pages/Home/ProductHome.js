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
      <h3 className="h3 text-center mb-4 mt-3">Product List</h3>
      <div className="table-responsive">
        <Table>
          <Thead className='table-header'>
            <Tr>
              <Th className='table-header'>Product #</Th>
              <Th className='table-header'>Product Name</Th>
              <Th className='table-header'>Scrum Master</Th>
              <Th className='table-header'>Product Owner</Th>
              <Th className='table-header'>Developers</Th>

              <Th className='table-header'>Start Date</Th>
              <Th className='table-header'>Methodology</Th>
            </Tr>
          </Thead>
          <Tbody>
            {product.map((product) => (
              <Tr key={product.productId}>
                <Td className='table-data'>{product.productId}</Td>
                <Td className='table-data'>{product.productName}</Td>
                <Td className='table-data'>{product.scrumMasterName}</Td>
                <Td className='table-data'>{product.productOwnerName}</Td>
                <Td className='table-data table-developer'>{product.Developers.join(",")}</Td>
                <Td className='table-data'>{product.startDate}</Td>
                <Td className='table-data'>{product.methodology}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProductHome;
