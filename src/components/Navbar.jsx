import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const Logo = styled(Typography)(({ theme }) => ({
  fontFamily: 'Brush Script MT, cursive',
  fontSize: '1.5rem',
  color: '#ff5a00',
  marginRight: theme.spacing(2),
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  justifyContent: 'center',
  flexGrow: 1,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const MobileMenuButton = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    navigate('/login'); 
    handleMenuClose();
  };

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <NavLink to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
          Perfil
        </NavLink>
      </MenuItem>
      {isAdmin && (
        <MenuItem onClick={handleMenuClose}>
          <NavLink to='/crud' style={{ textDecoration: 'none', color: 'inherit' }}>
            CRUD
          </NavLink>
        </MenuItem>
      )}
      <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
      <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }} >
      <Logo>Príncipe fresco</Logo>
      </NavLink>
        

        {/* Desktop Links */}
        <NavLinks>
          <NavLink to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="body1">SHOP</Typography>
          </NavLink>
          <NavLink to="/collections" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="body1">COLLECTIONS</Typography>
          </NavLink>
        </NavLinks>

        {/* Icons for desktop */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <AccountCircleOutlinedIcon />
          </IconButton>
          <NavLink to="/cart" style={{ color: 'inherit' }}>
            <IconButton color="inherit">
              <Badge color="error">
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
          </NavLink>
        </Box>

        {/* Mobile Menu Icon */}
        <MobileMenuButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleProfileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </MobileMenuButton>
      </Toolbar>
      {renderProfileMenu}
    </AppBar>
  );
};

export default Navbar;
