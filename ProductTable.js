import React from 'react';

const ProductTable = ({ products, pincode }) => {
  return (
    <div>
      {pincode && (
        <>
          {products.length > 0 ? (
            <div>
              <h2>Products for Pincode: {pincode}</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Shop Name</th>
                    <th>Shop Location</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} >
                      <td>{product.productName}</td>
                      <td>{product.shopName}</td>
                      <td>{product.shopLocation}</td>
                      
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No products available for this pincode</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProductTable;
