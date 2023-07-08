
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //Router is used to switch between pages in react
import Navbar from "./navbar";
import Cart from "../pages/Cart/Cart";
import Shop from "../pages/Shop/Shop";




function App() {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    return (
        <div className="App">
            <Router>
                <Navbar cartCount={cartItems} />
                <Routes>
                    <Route path="/" element={<Shop products={products} setProducts={setProducts} setCartItems={setCartItems} />} />
                    <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
                </Routes>
            </Router>
        </div>
    )
}
export default App; 