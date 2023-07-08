
import React, { useEffect } from "react";
import axios from "axios";
import "./Shop.css";
import ShopItem from "../../components/ShopItem";

function Shop({ products, setProducts, setCartItems }) {
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((productsData) => {
        setProducts(productsData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((response) => response.json())
      .then((data) => setCartItems(data.data))
      .catch((error) => console.error(error));
  }, []);

  const addToCart = (product) => {
    axios
      .post("http://localhost:5000/cart", product)
      .then((response) => {
        setCartItems(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="shop">
      <div className="shopTitle"></div>
      <div className="products">
        {products.map((product) => (
          <ShopItem key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
