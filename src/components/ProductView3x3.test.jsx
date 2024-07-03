import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ProductView3x3 } from "./ProductView3x3";
import { BrowserRouter as Router } from "react-router-dom";

const mock = new MockAdapter(axios);

describe("ProductView3x3", () => {
  const products = [
    {
      id: 1,
      title: "Product 1",
      category: "electronics",
      price: 100,
      rating: { rate: 4.5 },
      image: "image1.jpg",
    },
    {
      id: 2,
      title: "Product 2",
      category: "jewelery",
      price: 200,
      rating: { rate: 4.0 },
      image: "image2.jpg",
    },
    {
      id: 3,
      title: "Product 3",
      category: "men's clothing",
      price: 150,
      rating: { rate: 4.2 },
      image: "image3.jpg",
    },
  ];

  const onAddToCart = jest.fn();
  const onAddToWishlist = jest.fn();
  const selectedCategories = ["electronics"];

  beforeEach(() => {
    mock.onGet("https://fakestoreapi.com/products").reply(200, products);
  });

  afterEach(() => {
    mock.reset();
  });

  it("fetches and displays products", async () => {
    render(
      <Router>
        <ProductView3x3
          selectedCategories={[]}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      </Router>
    );

    await waitFor(() => {
      products.forEach((product) => {
        expect(screen.getByText(product.title)).toBeInTheDocument();
      });
    });
  });

  it("filters products based on search input", async () => {
    render(
      <Router>
        <ProductView3x3
          selectedCategories={[]}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Search for your item"), {
      target: { value: "Product 2" },
    });

    await waitFor(() => {
      expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });

  it("filters products based on selected categories", async () => {
    render(
      <Router>
        <ProductView3x3
          selectedCategories={selectedCategories}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Product 3")).not.toBeInTheDocument();
    });
  });

  it("handles add to cart action", async () => {
    render(
      <Router>
        <ProductView3x3
          selectedCategories={[]}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    fireEvent.click(
      screen.getAllByRole("button", { name: /FaShoppingCart/i })[0]
    );

    expect(onAddToCart).toHaveBeenCalledWith(products[0]);
  });

  it("handles add to wishlist action", async () => {
    render(
      <Router>
        <ProductView3x3
          selectedCategories={[]}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByRole("button", { name: /FaHeart/i })[0]);

    expect(onAddToWishlist).toHaveBeenCalledWith(products[0]);
  });
});
