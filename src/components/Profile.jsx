//eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import Navbar from './Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', password: '' });

  useEffect(() => {
    // Obtener el usuario completo del localStorage
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    console.log('Usuario desde localStorage:', user);

    if (!user) {
      setError('No se encontró el usuario en localStorage');
      return; // Salir si no hay usuario
    }

    setUser(user);
    setFormData({ name: user.name, password: '' }); // Inicializar con los datos del usuario
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode); // Cambia entre modo de edición y vista
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:3000/users/${user.id}`; // Suponiendo que el ID del usuario está disponible

    try {
      const updatedUser = { ...user, name: formData.name };
      if (formData.password) {
        updatedUser.password = formData.password; // Solo actualizar la contraseña si se proporciona
      }

      // Actualizar el JSON en el servidor
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      // Actualizar el localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser); // Actualizar el estado del usuario

      setEditMode(false); // Salir del modo de edición
    } catch (error) {
      setError('Error al actualizar los datos: ' + error.message);
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
    <Navbar />
      {user ? (
        <div>
          <Typography variant="h5">Perfil de Usuario</Typography>
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nombre"
                name="name"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                label="Contraseña"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
              />
              <Button 
                type="submit" 
                variant="contained" 
                style={{ backgroundColor: '#FFE031', color: 'black', marginTop: '20px' }}>
                Guardar Cambios
              </Button>
              <Button 
                type="button" 
                variant="outlined" 
                onClick={handleEditToggle} 
                style={{ marginLeft: '10px' }}>
                Cancelar
              </Button>
            </form>
          ) : (
            <div>
              <Typography variant="body1">Nombre: {user.name}</Typography>
              <Typography variant="body1">Email: {user.email}</Typography>
              <Typography variant="body1">Rol: {user.role || 'Usuario'}</Typography>
              <Button 
                variant="outlined" 
                onClick={handleEditToggle} 
                style={{ marginTop: '20px' }}>
                Editar Datos
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Typography variant="body1">Cargando datos del usuario...</Typography>
      )}
    </Container>
  );
};

export default Profile;
