import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./home.css";

function Home(props) {
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
    <div className="container">
      <div className="row mx-4">
        <h2 className="h2 text-center mb-4 mt-3">IMB</h2>
      </div>
      <h3 className="h3 text-center mb-4 mt-3">Product List</h3>
      <div className="table-responsive">
        <Table>
          <Thead>
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
            {user.map((user) => (
              <Tr key={user.productId}>
                <Td>{user.productId}</Td>
                <Td>{user.productName}</Td>
                <Td>{user.scrumMasterName}</Td>
                <Td>{user.productOwnerName}</Td>
                <Td>{user.Developers.join(",")}</Td>

                <Td>{user.startDate}</Td>
                <Td>{user.methodology}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

export default Home;
