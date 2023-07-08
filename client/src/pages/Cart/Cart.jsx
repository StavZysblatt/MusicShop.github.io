
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.css";
import CartItem from "../../components/CartItem";

function Cart({ cartItems, setCartItems }) {
  const [totalCost, setTotalCost] = useState(0);
  const [itemCost, setItemCost] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((response) => response.json())
      .then((data) => setCartItems(data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => { 
    calculateTotalCartCost(cartItems);
  }, [cartItems]);

  const increaseQuantity = (item) => {
    axios
      .put(`http://localhost:5000/cart/${item.id}/increase`)
      .then((response) => {
        setCartItems(response.data.cartItems);
        calculateTotalCartCost(response.data.cartItems);
      })
      .catch((error) => console.error(error));
  };

  const decreaseQuantity = (item) => {
    axios
      .put(`http://localhost:5000/cart/${item.id}/decrease`)
      .then((response) => {
        setCartItems(response.data.cartItems);
        calculateTotalCartCost(response.data.cartItems);
      })
      .catch((error) => console.error(error));
  };

  const removeItem = (item) => {
    axios
      .delete(`http://localhost:5000/cart/${item.id}/remove`)
      .then((response) => {
        setCartItems(response.data.cartItems);
        calculateTotalCartCost(response.data.cartItems);
      })
      .catch((error) => console.error(error));
  };

  const calculateTotalCartCost = (items) => {
    const sum = items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    setTotalCost(sum.toFixed(2));
  };

  const calculateItemCost = (item) => {
    const totalCost = item.price * item.quantity;
    return totalCost.toFixed(2);
  };

 

  return (
    <div className="cart">
      <div className="cartProducts">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            removeItem={removeItem}
            item={item}
            calculateItemCost = {calculateItemCost}
          />
        ))}
      </div>
      <div className="totalCost">Total Cart Cost: {totalCost}$</div>
    </div>
  );
}

export default Cart;
