import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CartPage } from "./CartPage";

describe("CartPage", () => {
  const cartItems = [
    {
      id: 1,
      title: "Product 1",
      price: 100,
      quantity: 2,
      image: "product1.jpg",
    },
    {
      id: 2,
      title: "Product 2",
      price: 50,
      quantity: 1,
      image: "product2.jpg",
    },
  ];

  const setup = () => {
    const onRemoveFromCart = jest.fn();
    const onQuantityChange = jest.fn();
    const utils = render(
      <CartPage
        cartItems={cartItems}
        onRemoveFromCart={onRemoveFromCart}
        onQuantityChange={onQuantityChange}
      />
    );
    return {
      onRemoveFromCart,
      onQuantityChange,
      ...utils,
    };
  };

  it("renders the CartPage component with cart items", () => {
    setup();
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Price: $100")).toBeInTheDocument();
    expect(screen.getByText("Price: $50")).toBeInTheDocument();
  });

  it("can handle quantity change", () => {
    const { onQuantityChange } = setup();
    const quantityInput = screen.getAllByRole("spinbutton")[0];

    fireEvent.change(quantityInput, { target: { value: "3" } });
    expect(onQuantityChange).toBeCalledWith(cartItems[0], "3");
  });

  it(" remove items from cart", () => {
    const { onRemoveFromCart } = setup();
    const removeButtons = screen.getAllByText("Remove from Cart");

    fireEvent.click(removeButtons[0]);
    expect(onRemoveFromCart).toBeCalledWith(cartItems[0]);

    fireEvent.click(removeButtons[1]);
    expect(onRemoveFromCart).toBeCalledWith(cartItems[1]);
  });
});
