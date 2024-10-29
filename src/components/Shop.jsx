import React, { useState, useEffect } from 'react';

const Shop = () => {
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    fetch("http://localhost:3000/collection")  
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, []);

  return (
    <div className="shop-container">
      <h1>Shop</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imagen_1} alt={product.nombre} className="product-image" />
            <h2>{product.nombre}</h2>
            <p>{product.descripcion}</p>
            <p><strong>Price:</strong> ${product.precio}</p>
            <p><strong>Sizes:</strong> {Array.isArray(product.tallas) ? product.tallas.join(", ") : product.tallas}</p>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
