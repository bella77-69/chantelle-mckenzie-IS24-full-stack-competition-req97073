import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./productHome.scss";

function ProductHome(props) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUser(data.users);
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
            {user.map((user) => (
              <Tr key={user.productId}>
                <Td className='table-data'>{user.productId}</Td>
                <Td className='table-data'>{user.productName}</Td>
                <Td className='table-data'>{user.scrumMasterName}</Td>
                <Td className='table-data'>{user.productOwnerName}</Td>
                <Td className='table-data table-developer'>{user.Developers.join(",")}</Td>
                <Td className='table-data'>{user.startDate}</Td>
                <Td className='table-data'>{user.methodology}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProductHome;
