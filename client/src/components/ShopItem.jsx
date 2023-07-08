
function ShopItem({ product, addToCart }) {
  return (
    <div className="product">
      <h2 className="productTitle">{product.title}</h2>
      <img src={product.image} alt={product.title} className="image" />
      <p className="productImage">{product.description}</p>
      <p className="productPrice">Price: {product.price}$</p>
      <div className="buttonContainer">
      <button className="addToCartBtn" onClick={() => addToCart(product)}>
        {" "}
        Add to Cart{" "}
      </button>
    </div>
    </div>
  );
}
 export default ShopItem;
