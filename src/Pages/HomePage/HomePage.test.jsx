import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { HomePage } from "./HomePage";
import { CategoriesSidePanel } from "../../components/CategoriesSidePanel";
import { ProductView3x3 } from "../../components/ProductView3x3";

jest.mock("../../components/CategoriesSidePanel", () => ({
  CategoriesSidePanel: jest.fn(() => <div>Mocked CategoriesSidePanel</div>),
}));

jest.mock("../../components/ProductView3x3", () => ({
  ProductView3x3: jest.fn(() => <div>Mocked ProductView3x3</div>),
}));

describe("HomePage", () => {
  const setup = () => {
    const onAddToCart = jest.fn();
    const onAddToWishlist = jest.fn();
    const utils = render(
      <HomePage onAddToCart={onAddToCart} onAddToWishlist={onAddToWishlist} />
    );
    return {
      onAddToCart,
      onAddToWishlist,
      ...utils,
    };
  };

  it("renders the HomePage component", () => {
    setup();
    expect(screen.getByText("Mocked CategoriesSidePanel")).toBeInTheDocument();
    expect(screen.getByText("Mocked ProductView3x3")).toBeInTheDocument();
  });

  it("handles selecting category and unselecting", () => {
    setup();
    const mockHandleCategoryChange =
      CategoriesSidePanel.mock.calls[0][0].onCategoryChange;

    // selecting
    mockHandleCategoryChange("Electronics");
    expect(mockHandleCategoryChange).toBeCalledWith("Electronics");

    // unselecting
    mockHandleCategoryChange("Electronics");
    expect(mockHandleCategoryChange).toBeCalledWith("Electronics");
  });

  it("passes correct props to CategoriesSidePanel and ProductView3x3", () => {
    const { onAddToCart, onAddToWishlist } = setup();

    expect(CategoriesSidePanel).toHaveBeenCalledWith(
      expect.objectContaining({
        onCategoryChange: expect.any(Function),
      }),
      {}
    );

    expect(ProductView3x3).toHaveBeenCalledWith(
      expect.objectContaining({
        selectedCategories: expect.any(Array),
        onAddToCart,
        onAddToWishlist,
      }),
      {}
    );
  });

  it("adds product to cart and wishlist", () => {
    const { onAddToCart, onAddToWishlist } = setup();
    const mockHandleAddToCart = ProductView3x3.mock.calls[0][0].onAddToCart;
    const mockHandleAddToWishlist =
      ProductView3x3.mock.calls[0][0].onAddToWishlist;

    mockHandleAddToCart({ id: 1, name: "Product 1" });
    expect(onAddToCart).toBeCalledWith({ id: 1, name: "Product 1" });

    mockHandleAddToWishlist({ id: 2, name: "Product 2" });
    expect(onAddToWishlist).toBeCalledWith({ id: 2, name: "Product 2" });
  });
});
