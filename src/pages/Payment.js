import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function Payment() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cardName || !cardNumber || !expiry || !cvv) {
      window.alert("Please fill in all credit card details.");
      return;
    }

    // simple fake validation
    if (cardNumber.replace(/\s/g, "").length < 12) {
      window.alert("Please enter a valid card number (demo validation).");
      return;
    }

    window.alert("Payment successful! (Demo only, no real payment processed.)");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <section className="page page-payment">
      <h1 className="page-title">Payment</h1>
      <p className="page-subtitle">
        Review your order and enter your credit card details to complete this
        demo checkout.
      </p>

      <div className="payment-layout">
        <div className="payment-summary">
          <h2>Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="empty-text">
              Your cart is empty. Go back to the shop to add some items.
            </p>
          ) : (
            <>
              <ul className="cart-list compact">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item compact">
                    <div>
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">
                        ₹ {item.price} × {item.quantity}
                      </p>
                    </div>
                    <p className="cart-item-price">
                      ₹ {item.price * item.quantity}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="cart-total-row">
                <span>Total:</span>
                <strong>₹ {totalAmount}</strong>
              </div>
              <button
                className="btn ghost-btn full-width"
                type="button"
                onClick={() => navigate("/cart")}
              >
                Return to Cart
              </button>
            </>
          )}
        </div>

        <div className="payment-form">
          <h2>Credit Card Details</h2>
          <form onSubmit={handleSubmit} className="card-form">
            <label>
              Name on Card
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="e.g. Aarav Mehta"
              />
            </label>

            <label>
              Card Number
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="xxxx xxxx xxxx xxxx"
              />
            </label>

            <div className="card-row">
              <label>
                Expiry (MM/YY)
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="05/29"
                />
              </label>
              <label>
                CVV
                <input
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                />
              </label>
            </div>

            <button
              type="submit"
              className="btn primary-btn full-width"
              disabled={cartItems.length === 0}
            >
              Pay ₹ {totalAmount || 0}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Payment;
