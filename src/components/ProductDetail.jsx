// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetData } from '../helpers/peticiones';
import { Box, Button, Typography, Select, MenuItem } from '@mui/material';
import styled from 'styled-components';
import { Thumbnail, ThumbnailContainer } from '../styles/Details';
import Navbar from './Navbar';

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad del producto
  const urlProduct = `http://localhost:3000/collection/${id}`; 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await GetData(urlProduct);
      setProduct(data);
    };
    fetchProduct();
  }, [id, urlProduct]);

  // Función para agregar al carrito
  const addToCart = () => {
    const user = localStorage.getItem('user'); 

    if (!user) {
      alert("Debes iniciar sesión para agregar al carrito");
      navigate('/login'); 
      return;
    }
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productToAdd = {
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen_1,
      cantidad: cantidad, // Usar la cantidad seleccionada
    };

    const existingProduct = cart.find(item => item.id === productToAdd.id);

    if (existingProduct) {
      existingProduct.cantidad += cantidad; // Aumenta la cantidad si ya está en el carrito
    } else {
      cart.push(productToAdd); // Añade el producto si no está
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Guarda en localStorage
    alert("Producto añadido al carrito");
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <Container>
        <ThumbnailContainer>
          {[product.imagen_1, product.imagen_2, product.imagen_3, product.imagen_4].map((image, index) => (
            <Thumbnail key={index} src={image} />
          ))}
        </ThumbnailContainer>
        <ImageContainer>
          <MainImage src={product.imagen_1} alt={product.nombre} />
        </ImageContainer>
        
        <DetailsContainer>
          <Typography variant="h4">{product.nombre}</Typography>
          <Typography variant="h5" color="textSecondary">${product.precio}</Typography>
          
          <SizeSelector>
            <Typography variant="body1">Size</Typography>
            <Select value={cantidad} onChange={(e) => setCantidad(e.target.value)}>
              {["S", "M", "L", "XL", "XXL"].map((size) => ( // Ajusté los tamaños a cantidades
                <MenuItem key={size} value={size}>{size}</MenuItem>
              ))}
            </Select>
          </SizeSelector>

          <Typography variant="body2" color="textSecondary">{product.descripcion}</Typography>
          
          <ButtonContainer>
            <Button variant="contained" color="primary" onClick={addToCart}>Add to Cart</Button>
            <Button variant="outlined" color="primary">Buy it now</Button>
          </ButtonContainer>
        </DetailsContainer>
      </Container>
    </div>
  );
};

export default ProductDetail;

const Container = styled(Box)`
  display: flex;
  padding: 20px;
`;

const ImageContainer = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
`;

const DetailsContainer = styled(Box)`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const SizeSelector = styled(Box)`
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;
