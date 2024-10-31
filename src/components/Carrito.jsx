//eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

// Componente para el carrito de compras
const Carrito = () => {
    const [cartItems, setCartItems] = useState([]);

    // Cargar los productos del carrito desde localStorage al iniciar
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart); // Establece el estado inicial con los productos del localStorage
    }, []); // Solo se ejecuta una vez al montar el componente

    const removeItemFromCart = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Guarda los cambios en localStorage
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart'); // Limpia el carrito en localStorage
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);

    const updateItemQuantity = (id, change) => {
        const updatedCart = cartItems.map((item) => {
            if (item.id === id) {
                const newQuantity = item.cantidad + change;
                if (newQuantity > 0) {
                    return { ...item, cantidad: newQuantity }; // Actualiza la cantidad
                } else {
                    return null; // Deja que se filtre más adelante si la cantidad es 0
                }
            }
            return item; // Devuelve el item sin cambios
        }).filter(item => item !== null); // Filtra los items que son null (cuando la cantidad es 0)

        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Guarda los cambios en localStorage
    };

    return (
        <div>
            <h2>Carrito de Compras</h2>
            {cartItems.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <p>{item.nombre} - ${item.precio} x {item.cantidad}</p>
                            <button onClick={() => updateItemQuantity(item.id, 1)}>+</button>
                            <button onClick={() => updateItemQuantity(item.id, -1)}>-</button>
                            <button onClick={() => removeItemFromCart(item.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}
            <h3>Total: ${totalPrice}</h3>
            <button onClick={clearCart}>Limpiar Carrito</button>
            <button onClick={() => alert('Proceder a la compra')}>Proceder a la compra</button>
        </div>
    );
};

export default Carrito;
