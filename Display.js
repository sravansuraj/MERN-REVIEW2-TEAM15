import React, { useState, useEffect } from 'react';

export default function Display() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:8080/products') 
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="page-container">
      <div className="product-list-container">
        <h1>Product List</h1>
        <table className="product-table">
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
            {Array.isArray(products) && products.map((product, index) => (
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
    </div>
  );
}
