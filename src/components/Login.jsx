// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { TextField, Button, Container, Typography} from '@mui/material';
import { GetData } from '../helpers/peticiones'; 
import { NavLink, useNavigate } from 'react-router-dom'; 


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:3000/users'; 
  
    try {
      
      const users = await GetData(url);
      const user = users.find(user => user.email === formData.email && user.password === formData.password);
  
      if (user) {
        alert('Login exitoso. Bienvenido!');
        setError(''); 
        setSuccess('Login exitoso');
        setFormData({ email: '', password: '' });
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/home');
      } else {
        setError('Correo o contraseña incorrectos');
        setSuccess(''); 
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Hubo un problema al iniciar sesión');
    }
  };

  return (
    <Container>
      
      <Typography variant="h4" 
      align='center'
      style={{ marginTop: '90px' }} >
        Iniciar sesión
      </Typography>
      
      {error && <Typography color="error">{error}</Typography>} {/* Mostrar error si los datos no son correctos */}
      {success && <Typography color="primary">{success}</Typography>} {/* Mostrar éxito si el login fue exitoso */}
      <form onSubmit={handleSubmit}>
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
        <Button 
        type="submit" 
        variant="contained" fullWidth 
        style={{ backgroundColor: '#FFE031', color:'black', marginTop: '400px' }}>
          Iniciar sesión
        </Button>
        
        <Typography align="center" style={{ marginTop: '20px' }}>¿No tienes cuenta? 
        <NavLink to='/register'>
        Registrate
        </NavLink>
        </Typography>
      </form>
    </Container>
  );

};



  

export default Login;
