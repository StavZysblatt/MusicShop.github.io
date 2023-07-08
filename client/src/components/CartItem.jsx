
function CartItem({ item, increaseQuantity, removeItem, decreaseQuantity, calculateItemCost}) {

  const itemCost = calculateItemCost(item)
  return (
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p>Price: {item.price}$</p>
      <p >Quantity: {item.quantity}</p>
      <p >Total Item Cost: {itemCost}$</p>
      <div className="Btn-Container">
        <button onClick={() => increaseQuantity(item)}> + </button>
        <button onClick={() => decreaseQuantity(item)}> - </button>
        <button onClick={() => removeItem(item)}> X </button>
      </div>
    </div>
  );
}

export default CartItem;
