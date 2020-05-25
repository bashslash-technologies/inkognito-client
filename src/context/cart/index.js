import React from 'react';

export const CartContext = React.createContext();

export default ({children}) => {
  const [cart, setCart] = React.useState([]);

  const addItemToCart = item => {
    const items = [...cart.filter(el => el._id !== item._id), item];
    setCart(items);
  };

  const removeItemFromCart = item_id => {
    const items = [...cart.filter(el => el._id !== item_id)];
    setCart(items)
  };

  return (
    <CartContext.Provider value={{addItemToCart, removeItemFromCart, cart}}>
      {children}
    </CartContext.Provider>
  );
};
