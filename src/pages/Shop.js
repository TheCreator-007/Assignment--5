import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const shoes = [
  {
    id: 1,
    name: "AirWave Runner",
    price: 2999,
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "StreetFlex Casuals",
    price: 1999,
    image:
      "https://images.pexels.com/photos/2529150/pexels-photo-2529150.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "ProCourt Sneakers",
    price: 3499,
    image:
      "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "UrbanWalk Sports",
    price: 2599,
    image:
      "https://images.pexels.com/photos/2529151/pexels-photo-2529151.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

function Shop() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const filteredShoes = shoes.filter((shoe) =>
    shoe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="page page-shop">
      <h1 className="page-title">Shoe Store</h1>
      <p className="page-subtitle">
        Browse trendy shoes and add them to your cart. Use the search bar to
        quickly find your favourite pair.
      </p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search shoes by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="shop-grid">
        {filteredShoes.length === 0 ? (
          <p className="empty-text">
            No shoes found for &quot;{search}&quot;. Try a different name.
          </p>
        ) : (
          filteredShoes.map((shoe) => (
            <div key={shoe.id} className="shoe-card">
              <img src={shoe.image} alt={shoe.name} className="shoe-image" />
              <h3 className="shoe-name">{shoe.name}</h3>
              <p className="shoe-price">₹ {shoe.price}</p>
              <button
                className="btn primary-btn"
                onClick={() => dispatch(addToCart(shoe))}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Shop;
