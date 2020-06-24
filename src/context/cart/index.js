import React from 'react';

export const CartContext = React.createContext();

export default ({children}) => {
  const [cart, setCart] = React.useState([]);

  const addItemToCart = item => {
    const new_item = {
      ...item,
      qty: 1,
    };
    const items = [...cart.filter(el => el._id !== item._id), new_item];
    setCart(items);
  };

  const increaseQty = item_id => {
    const item = cart.find(cart_item => cart_item._id === item_id);
    if (item) {
      const new_cart_item = {
        ...item,
        qty: item.qty + 1,
      };
      const new_set_of_items = [
        ...cart.filter(el => el._id !== item_id),
        new_cart_item,
      ];
      setCart(new_set_of_items);
    }
  };

  const decreaseQty = item_id => {
    const item = cart.find(cart_item => cart_item._id === item_id);
    if (item) {
      const new_cart_item = {
        ...item,
        qty: item.qty > 1 ? item.qty - 1 : item.qty,
      };
      const new_set_of_items = [
        ...cart.filter(el => el._id !== item_id),
        new_cart_item,
      ];
      setCart(new_set_of_items);
    }
  };

  const removeItemFromCart = item_id => {
    const items = [...cart.filter(el => el._id !== item_id)];
    setCart(items);
  };

  return (
    <CartContext.Provider
      value={{
        addItemToCart,
        removeItemFromCart,
        cart,
        increaseQty,
        decreaseQty,
      }}>
      {children}
    </CartContext.Provider>
  );
};
