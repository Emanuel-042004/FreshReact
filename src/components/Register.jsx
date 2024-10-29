// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { PostData, GetData } from '../helpers/peticiones'; 
import { NavLink } from 'react-router-dom';


const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  const [error, setError] = useState('');

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:3000/users';

    try {
      
      const users = await GetData(url);
      const emailExists = users.some(user => user.email === formData.email);

      if (emailExists) {
        setError('El correo ya está en uso');
        return;
      }

      
      const status = await PostData(url, formData);
      if (status === 201) {
        alert('Usuario registrado con éxito');
        setFormData({ name: '', email: '', password: '', role: '' }); 
        setError(''); 
      } else {
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <Container>
    
      <Typography variant="h5" align="center" style={{ marginTop: '90px' }}>
        Create account
      </Typography>
      {error && <Typography color="error">{error}</Typography>} {/* Mostrar error si el correo ya existe */}
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
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
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

        {/* Select para elegir el rol */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Rol</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="buyer">Buyer</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>

        <Button 
        type="submit" 
        variant="contained" 
        className="chip" 
        style={{ backgroundColor: '#FFE031', color:'black', marginTop: '300px' }} fullWidth >
          Registrarse
        </Button>
        
        <Typography align="center" style={{ marginTop: '20px' }}>¿Ya tienes cuenta? 
        <NavLink to='/login'>
        Iniciar Sesion
        </NavLink>
        </Typography>
      </form>
    </Container>
  );
};


  

export default Register;
