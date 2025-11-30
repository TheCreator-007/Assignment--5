import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";

function App() {
  return (
    <div className="app-root">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="*"
            element={
              <div className="page">
                <h1 className="page-title">Page Not Found</h1>
                <p className="page-subtitle">
                  The page you are looking for does not exist in this demo app.
                </p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
