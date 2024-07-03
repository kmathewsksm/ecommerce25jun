import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CategoriesSidePanel } from "./CategoriesSidePanel";

const mock = new MockAdapter(axios);

describe("CategoriesSidePanel", () => {
  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  const onCategoryChange = jest.fn();

  beforeEach(() => {
    mock
      .onGet("https://fakestoreapi.com/products/categories")
      .reply(200, categories);
  });

  afterEach(() => {
    mock.reset();
  });

  it("renders categories fetched from API", async () => {
    render(<CategoriesSidePanel onCategoryChange={onCategoryChange} />);

    await waitFor(() => {
      categories.forEach((category) => {
        expect(screen.getByLabelText(category)).toBeInTheDocument();
      });
    });
  });

  it("can change category ", async () => {
    render(<CategoriesSidePanel onCategoryChange={onCategoryChange} />);

    await waitFor(() => {
      categories.forEach((category) => {
        fireEvent.click(screen.getByLabelText(category));
        expect(onCategoryChange).toHaveBeenCalledWith(category);
      });
    });
  });

  it("handle errors while fetching data", async () => {
    mock.onGet("https://fakestoreapi.com/products/categories").reply(500);

    render(<CategoriesSidePanel onCategoryChange={onCategoryChange} />);

    await waitFor(() => {
      expect(screen.queryByLabelText(categories[0])).not.toBeInTheDocument();
    });
  });
});
