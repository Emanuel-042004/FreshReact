//eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { GetData } from '../helpers/peticiones'; 
import { Title,  Card, CardContainer } from '../styles/Home'; 

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const urlCollections = 'http://localhost:3000/collection';

  useEffect(() => {
    const fetchCollections = async () => {
      const data = await GetData(urlCollections);
      setCollections(data);
    };
    fetchCollections();
  }, []);

  return (
    <div>
      <Navbar />
      <Title>Collections</Title>
      <CardContainer>
        {collections.map((collection) => (
          <Card key={collection.id}>
            <img src={collection.imagen_1} alt={collection.nombre} />
            <h3>{collection.nombre}</h3>
          </Card>
        ))}
      </CardContainer>
    </div>
  );
}

export default Collections;