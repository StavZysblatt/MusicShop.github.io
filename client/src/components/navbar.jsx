

import React from "react";
import {Link} from "react-router-dom";
import {ShoppingCart} from "phosphor-react";
import {House} from "phosphor-react";
import "./navbar.css";
function Navbar({cartCount}){

    const totalQuantity = cartCount.reduce((total, item) => total + item.quantity, 0);

    return(
    <div className="navbar">
        <h1 className="storeName">Audio Oasis</h1>
        <div className="links">
            <Link to="/" > <House size={32} /> </Link>
            <Link to="/cart" > 
                <ShoppingCart  size={32}  />
                {totalQuantity}
            </Link>
        </div>
    </div>
    )
};

export default Navbar;
