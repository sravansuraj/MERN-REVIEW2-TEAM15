import React, { useState } from 'react';
import Display from './Display';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    shopName: '',
    shopLocation: '',
    pincode: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/addform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Product added successfully');
        // Reset form after successful submission
        setFormData({
          productName: '',
          shopName: '',
          shopLocation: '',
          pincode: '',
          phoneNumber: ''
        });
        // Refresh the page after successful submission
        window.location.reload();
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input type="text" id="productName" name="productName" value={formData.productName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="shopName">Shop Name:</label>
          <input type="text" id="shopName" name="shopName" value={formData.shopName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="shopLocation">Shop Location:</label>
          <input type="text" id="shopLocation" name="shopLocation" value={formData.shopLocation} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="pincode">Pincode:</label>
          <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Display/>
    </>
  );
};

export default AddProductForm;

