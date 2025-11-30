import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decrementItem, removeItem } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleProceedToPayment = () => {
    if (cartItems.length === 0) {
      window.alert("Your cart is empty. Please add some items first.");
      return;
    }
    navigate("/payment");
  };

  return (
    <section className="page page-cart">
      <h1 className="page-title">Shopping Cart</h1>
      <p className="page-subtitle">
        Review your selected shoes. You can change quantities, remove items, or
        proceed to the payment page.
      </p>

      {cartItems.length === 0 ? (
        <p className="empty-text">
          Your cart is empty. Go back to the shop and add some shoes!
        </p>
      ) : (
        <div className="cart-layout">
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-main">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div>
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">
                      ₹ {item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="cart-actions">
                  <button
                    className="btn small-btn"
                    onClick={() => dispatch(decrementItem(item.id))}
                  >
                    -
                  </button>
                  <span className="qty">{item.quantity}</span>
                  <button
                    className="btn small-btn"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    +
                  </button>
                  <button
                    className="btn ghost-btn"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h2>Summary</h2>
            <p className="summary-line">
              Items:{" "}
              <strong>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </strong>
            </p>
            <p className="summary-line">
              Total Amount: <strong>₹ {totalAmount}</strong>
            </p>

            <button
              className="btn primary-btn full-width"
              onClick={handleProceedToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
