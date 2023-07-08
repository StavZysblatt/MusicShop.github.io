
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require('fs');



app.use(express.json());
app.use(cors());

let cartItems = [];

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};

app.get('/products', cors(corsOptions), (req, res) => { //the function that handles the request to show the products in the shop
    fs.readFile('products.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch products' });
            return;
        }

        const file = JSON.parse(data.toString());
        res.json(file.products);

    })

})

app.post('/cart', cors(corsOptions), (req, res) => { //the function that handles adding to the cart
    const product = req.body;
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        product.quantity = 1;
        cartItems.push(product);
    }

    res.json({
        data: cartItems
    });

});

app.get('/cart', cors(corsOptions), (req, res) => {
    res.json({
        data: cartItems
    });
});


app.put('/cart/:id/increase', cors(corsOptions), (req, res) => { //handles the increase quantity of an item in the cart
    const itemId = parseInt(req.params.id); // string
    const existingItem = cartItems.find(item => item.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
        res.status(200).json({ cartItems }).send
        return;
    }
    res.status(404).json('Item not found in the cart');

});


app.delete('/cart/:id/remove', cors(corsOptions), (req, res) => { // handles the remove from the cart button 'X'
    const itemId = parseInt(req.params.id);
    cartItems = cartItems.filter(item => item.id !== itemId);
    res.status(200).json({ cartItems }) 
})

app.put('/cart/:id/decrease', cors(corsOptions), (req, res) => { // same as increase but handles decrease
    const itemId = parseInt(req.params.id);
    const existingItem = cartItems.find(item => item.id === itemId);

    if (existingItem) {
        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
            res.json({ cartItems });
            return;
        } else {
            cartItems.splice(cartItems.indexOf(existingItem), 1);
            res.json({ cartItems });
            return;
        }
    }
    res.status(404).json('Item not found in the cart');
});

app.listen(5000, () => {
    console.log("server listening on 5000..")
})