//eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { GetData, PostData, PatchData, DeleteData } from '../helpers/peticiones'; // 
import { TextField, Button, Typography, Card, CardContent} from '@mui/material';
import Navbar from './Navbar'

const Crud = () => {
  const [collections, setCollections] = useState([]);
  const [newCollection, setNewCollection] = useState({
    nombre: '',
    descripcion: '',
    tallas: '',
    precio: '',
    imagen_1: '',
    imagen_2: '',
    imagen_3: '',
    imagen_4: '',
  });
  const [editing, setEditing] = useState(false);
  const [currentCollection, setCurrentCollection] = useState(null);
  const urlCollections = 'http://localhost:3000/collection';

  // Obtener collections
  useEffect(() => {
    const fetchCollections = async () => {
      const data = await GetData(urlCollections);
      setCollections(data);
    };
    fetchCollections();
  }, []);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCollection({ ...newCollection, [name]: value });
  };

// Agregar nuevo collection
const handleAddCollection = async () => {
  if (!newCollection.nombre || !newCollection.descripcion || !newCollection.tallas || !newCollection.precio || !newCollection.imagen_1 || !newCollection.imagen_2 || !newCollection.imagen_3 || !newCollection.imagen_4) {
    alert('Todos los campos son obligatorios.');
    return;
  }

  // Obtener el ultimo ID  y asignar el siguiente ID
  const currentIds = collections.map(collection => collection.id);
  const newId = currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1; 
  const collectionConId = { ...newCollection, id: newId }; 

  const status = await PostData(urlCollections, collectionConId);
  if (status === 201) {
    setCollections([...collections, collectionConId]); 
    setNewCollection({  nombre: '',
        descripcion: '',
        tallas: '',
        precio: '',
        imagen_1: '',
        imagen_2: '',
        imagen_3: '',
        imagen_4: '', }); 
  }
};


  // Eliminar collection
  const handleDeleteCollection = async (id) => {
    const confirmation = window.confirm("¿Estás seguro de que deseas eliminar esta colección?");
    
    if (confirmation) {
      const deleteUrl = `${urlCollections}/${id}`;
      await DeleteData(deleteUrl);
      setCollections(collections.filter((collection) => collection.id !== id));
      alert("Colección eliminada exitosamente");
    }
  };
  // Editar collection
  const handleEditCollection = (collection) => {
    setEditing(true);
    setCurrentCollection(collection);
    setNewCollection(collection); 
  };

  // Guardar cambios al editar
  const handleSaveEdit = async () => {
    const updateUrl = `${urlCollections}/${currentCollection.id}`;
    await PatchData(updateUrl, newCollection);
    setCollections(collections.map((collection) => (collection.id === currentCollection.id ? newCollection : collection)));
    setEditing(false);
    setNewCollection({  nombre: '',
        descripcion: '',
        tallas: '',
        precio: '',
        imagen_1: '',
        imagen_2: '',
        imagen_3: '',
        imagen_4: '',}); 
    setCurrentCollection(null);
  };

  return (
    <div>
    <Navbar />
    
  
  
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        CRUD de Collections
      </Typography>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* Formulario para agregar/editar collection */}
        <div style={{ flex: '1 1 300px' }}>
          <TextField
            label="Nombre de coleccion"
            name="nombre"
            value={newCollection.nombre}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Descripcion"
            name="descripcion"
            value={newCollection.descripcion}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            
          />
          <TextField
            label="Tallas"
            name="tallas"
            value={newCollection.tallas}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Precio"
            name="precio"
            
            value={newCollection.precio}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="URL Imagen  1"
            name="imagen_1"
            value={newCollection.imagen_1}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="URL Imagen  2"
            name="imagen_2"
            value={newCollection.imagen_2}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="URL Imagen  3"
            name="imagen_3"
            value={newCollection.imagen_3}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="URL Imagen  4"
            name="imagen_4"
            value={newCollection.imagen_4}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />

          {editing ? (
            <Button variant="contained" color="primary" onClick={handleSaveEdit} style={{ marginTop: '20px' }}>
              Guardar Cambios
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleAddCollection} style={{ marginTop: '20px' }}>
              Agregar Collection
            </Button>
          )}
        </div>

        {/* Lista de collections */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', flex: '2 1 700px' }}>
          {collections.map((collection) => (
            <div key={collection.id} style={{ flex: '30px', minWidth: '250px', }}>
              <Card>
              {console.log(collection.imagen_1)}
              <img src={collection.imagen_1} alt={collection.nombre} style={{ width: '100%', height: '400px', objectFit: 'constain' }}/>
                <CardContent>
                  <Typography variant="h6">{collection.nombre}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio: ${collection.precio}
                  </Typography>
                  <Button variant="contained" color="secondary" onClick={() => handleEditCollection(collection)}>
                    Editar
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteCollection(collection.id)}>
                    Eliminar
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Crud;
