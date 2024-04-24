import React, { useState, useEffect } from 'react';

const SearchData = ({ pincode }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    fetch(`http://localhost:8080/products?pincode=${pincode}`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [pincode]);

  return (
    <div>
      <h2>Products for Pincode: {pincode}</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Shop Name</th>
            <th>Shop Location</th>
            <th>Pincode</th>
            <th>Phone Number</th>
            
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.productName}</td>
              <td>{product.shopName}</td>
              <td>{product.shopLocation}</td>
              <td>{product.pincode}</td>
              <td>{product.phoneNumber}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchData;
