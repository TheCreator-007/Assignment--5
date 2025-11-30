import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-mark">S5</span>
          <span className="logo-text">ShoeHub Redux</span>
        </div>

        <nav className="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Cart
            {totalItems > 0 && (
              <span className="badge">{totalItems}</span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
