import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import axios from "axios";

export function CategoriesSidePanel({ onCategoryChange }) {
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategoriesList(response.data);
      } catch (error) {
        console.log("error in data fetching all categories", error);
      }
    };
    fetchAllCategories();
  }, []);

  const handleCategoryChange = (category) => {
    onCategoryChange(category);
  };

  return (
    <>
      <div style={{ marginTop: "1rem" }}>
        <h3>Categories</h3>
        <hr />
        {categoriesList.map((category, index) => (
          <Col key={index}>
            <Form.Check
              type="checkbox"
              id={`category-${index}`}
              label={category}
              onChange={() => handleCategoryChange(category)}
            />
          </Col>
        ))}
      </div>
    </>
  );
}
