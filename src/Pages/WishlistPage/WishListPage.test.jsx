import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WishlistPage } from "./WishListPage";
import { BrowserRouter as Router } from "react-router-dom";

describe("WishlistPage", () => {
  const wishlistItems = [
    {
      id: 1,
      title: "Product 1",
      price: 100,
      image: "product1.jpg",
    },
    {
      id: 2,
      title: "Product 2",
      price: 50,
      image: "product2.jpg",
    },
  ];

  const setup = () => {
    const onRemoveFromWishlist = jest.fn();
    const utils = render(
      <Router>
        <WishlistPage
          wishlistItems={wishlistItems}
          onRemoveFromWishlist={onRemoveFromWishlist}
        />
      </Router>
    );
    return {
      onRemoveFromWishlist,
      ...utils,
    };
  };

  it("renders the WishlistPage component with wishlist items", () => {
    setup();
    expect(screen.getByText("Your Wishlist")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Price: $100")).toBeInTheDocument();
    expect(screen.getByText("Price: $50")).toBeInTheDocument();
  });

  it("handles removal of items from the wishlist", () => {
    const { onRemoveFromWishlist } = setup();
    const removeButtons = screen.getAllByText("Remove from Wishlist");

    fireEvent.click(removeButtons[0]);
    expect(onRemoveFromWishlist).toBeCalledWith(wishlistItems[0]);

    fireEvent.click(removeButtons[1]);
    expect(onRemoveFromWishlist).toBeCalledWith(wishlistItems[1]);
  });
});
