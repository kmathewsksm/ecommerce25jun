import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./Header";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

describe("Header", () => {
  const cartItems = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
  ];
  const wishlistItems = [
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
  ];
  const username = "testuser";
  const onLogout = jest.fn();

  const setup = (
    isLoggedIn = true,
    cartAnimate = false,
    wishlistAnimate = false
  ) => {
    return render(
      <Router>
        <Header
          cartItems={cartItems}
          wishlistItems={wishlistItems}
          username={username}
          onLogout={onLogout}
          isLoggedIn={isLoggedIn}
          cartAnimate={cartAnimate}
          wishlistAnimate={wishlistAnimate}
        />
      </Router>
    );
  };

  test("renders the Header when logged in", () => {
    setup(true);
    expect(screen.getByText("Ecommerce")).toBeInTheDocument();
    expect(screen.getByText(`(${cartItems.length})`)).toBeInTheDocument();
    expect(screen.getByText(`(${wishlistItems.length})`)).toBeInTheDocument();
    expect(screen.getByText(username)).toBeInTheDocument();
  });

  test("renders Header when logged out", () => {
    setup(false);
    expect(screen.getByText("Ecommerce")).toBeInTheDocument();
    expect(screen.queryByText(`(${cartItems.length})`)).not.toBeInTheDocument();
    expect(
      screen.queryByText(`(${wishlistItems.length})`)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(username)).not.toBeInTheDocument();
  });

  it("handles logout ", () => {
    setup(true);
    fireEvent.click(screen.getByText(username));
    fireEvent.click(screen.getByText("Logout"));
    expect(onLogout).toHaveBeenCalled();
  });
});
