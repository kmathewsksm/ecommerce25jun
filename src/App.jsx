import React, { useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./Pages/HomePage/HomePage";
import { ProductDescription } from "./Pages/ProductDescription/ProductDescription";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { WishlistPage } from "./Pages/WishlistPage/WishListPage";
import { CartPage } from "./Pages/CartPage/CartPage";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import users from "../src/assets/users.json"

const PrivateRoute = ({ element, isLoggedIn, ...rest }) => {
  return isLoggedIn ? element : <Navigate to="/login" />;
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [cartAnimate, setCartAnimate] = useState(false);
  const [wishlistAnimate, setWishlistAnimate] = useState(false);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    setCartAnimate(true);
    setTimeout(() => setCartAnimate(false), 1000);
  };

  const handleAddToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.some((item) => item.id === product.id)) {
        return [...prevItems, product];
      }
      return prevItems;
    });
    setWishlistAnimate(true);
    setTimeout(() => setWishlistAnimate(false), 1000); // Animation duration
  };

  const handleRemoveFromCart = (product) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
  };

  const handleQuantityChange = (product, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: parseInt(quantity) }
          : item
      )
    );
  };

  const handleRemoveFromWishlist = (product) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    const firstName = users.find(user => user.username === username)?.name.firstname;
    setUsername(firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase());
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <Router>
      <Header
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        username={username}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        cartAnimate={cartAnimate}
        wishlistAnimate={wishlistAnimate}
      />
      <Container>
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                element={
                  <HomePage
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                    wishlistItems={wishlistItems}
                    onRemoveFromWishlist={handleRemoveFromWishlist}
                  />
                }
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                element={
                  <ProductDescription
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                    wishlistItems={wishlistItems}
                    onRemoveFromWishlist={handleRemoveFromWishlist}
                  />
                }
              />
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                element={
                  <CartPage
                    cartItems={cartItems}
                    onRemoveFromCart={handleRemoveFromCart}
                    onQuantityChange={handleQuantityChange}
                  />
                }
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                element={
                  <WishlistPage
                    wishlistItems={wishlistItems}
                    onRemoveFromWishlist={handleRemoveFromWishlist}
                    onAddToCart={handleAddToCart}
                  />
                }
              />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
