import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Home.css'; // Import CSS file for styling
import Homemiddle from './Homemiddle';
import End from './End';



export default function Home() {
  const [pincode, setPincode] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useN    avigate

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8080/products/${pincode}`);
      setProducts(response.data);
    } catch (error) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const navigateToAddForm = () => {
    navigate('/addform'); // Navigate to Addform component
  };

  return (
    <>
    <div className="container">
      <button className="add-button1" onClick={navigateToAddForm}>Add Product</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          className='input-box'
          onChange={handlePincodeChange}
        />
        <button type="submit" className='add-button2'>Fetch Products</button>
      </form>
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {products.length > 0 ? (
        <div>
          <h2>Products for Pincode: {pincode}</h2>
          <table className="product-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Shop Name</th>
                <th>Shop Location</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.productName}</td>
                  <td>{product.shopName}</td>
                  <td>{product.shopLocation}</td>
                  <td>{product.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No products found for pincode: {pincode}</p>
      )}
      <Homemiddle/>
      <End/>
    </div>
    </>
  );
}
