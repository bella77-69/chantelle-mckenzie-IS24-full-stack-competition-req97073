import React, { useState } from 'react';

const SearchHome = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      const { products } = data;
      const filteredResults = products.filter((product) => {
        const developersMatch = product.Developers.some((developer) =>
          developer.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const scrumMasterMatch = product.scrumMasterName.toLowerCase().includes(searchTerm.toLowerCase());
        const productOwnerMatch = product.productOwnerName.toLowerCase().includes(searchTerm.toLowerCase());
        const productNameMatch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
  
        return developersMatch || scrumMasterMatch || productOwnerMatch || productNameMatch;
      });
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search by name, developer, Scrum Master, or product owner" />
      <button onClick={handleSearch}>Search</button>

      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((product) => (
            <li key={product.productId}>
              <h2>{product.productName}</h2>
              <p>Product Owner: {product.productOwnerName}</p>
              <p>Developers: {product.Developers.join(' ')}</p>
              <p>Scrum Master: {product.scrumMasterName}</p>
              <p>Start Date: {product.startDate}</p>
              <p>Methodology: {product.methodology}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchHome;