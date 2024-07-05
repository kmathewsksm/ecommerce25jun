import React, { useState, useEffect } from "react";
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
import users from "../src/assets/users.json";

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

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.isLoggedIn) {
      setIsLoggedIn(true);
      setUsername(userData.username);
      setCartItems(userData.cartItems || []);
      setWishlistItems(userData.wishlistItems || []);
    }
  }, []);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        const updatedCartItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("user")),
            cartItems: updatedCartItems,
          })
        );
        return updatedCartItems;
      } else {
        const updatedCartItems = [...prevItems, { ...product, quantity: 1 }];
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("user")),
            cartItems: updatedCartItems,
          })
        );
        return updatedCartItems;
      }
    });
    setCartAnimate(true);
    setTimeout(() => setCartAnimate(false), 1000);
  };

  const handleAddToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.some((item) => item.id === product.id)) {
        const updatedWishlistItems = [...prevItems, product];
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("user")),
            wishlistItems: updatedWishlistItems,
          })
        );
        return updatedWishlistItems;
      }
      return prevItems;
    });
    setWishlistAnimate(true);
    setTimeout(() => setWishlistAnimate(false), 1000);
  };

  const handleRemoveFromCart = (product) => {
    setCartItems((prevItems) => {
      const updatedCartItems = prevItems.filter(
        (item) => item.id !== product.id
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("user")),
          cartItems: updatedCartItems,
        })
      );
      return updatedCartItems;
    });
  };

  const handleQuantityChange = (product, quantity) => {
    setCartItems((prevItems) => {
      const updatedCartItems = prevItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: parseInt(quantity) }
          : item
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("user")),
          cartItems: updatedCartItems,
        })
      );
      return updatedCartItems;
    });
  };

  const handleRemoveFromWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const updatedWishlistItems = prevItems.filter(
        (item) => item.id !== product.id
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("user")),
          wishlistItems: updatedWishlistItems,
        })
      );
      return updatedWishlistItems;
    });
  };

  const handleLogin = (username) => {
    const firstName = users.find((user) => user.username === username)?.name
      .firstname;
    const formattedName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.username === formattedName) {
      setCartItems(userData.cartItems || []);
      setWishlistItems(userData.wishlistItems || []);
    } else {
      const newUserData = {
        username: formattedName,
        isLoggedIn: true,
        cartItems: [],
        wishlistItems: [],
      };
      localStorage.setItem("user", JSON.stringify(newUserData));
      setCartItems([]);
      setWishlistItems([]);
    }
    setIsLoggedIn(true);
    setUsername(formattedName);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    const userData = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem(
      "user",
      JSON.stringify({ ...userData, isLoggedIn: false })
    );
    setUsername("");
    setCartItems([]);
    setWishlistItems([]);
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
