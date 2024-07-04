import React, { useState } from "react";
import { CategoriesSidePanel } from "../../components/CategoriesSidePanel";
import { ProductView3x3 } from "../../components/ProductView3x3";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import "./HomePage.css";

export function HomePage({ onAddToCart, onAddToWishlist, wishlistItems, onRemoveFromWishlist }) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat) => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  return (
    <Container className="home-wrapper">
      <Row>
        <Col md={3} className="side-panel-col">
          <CategoriesSidePanel onCategoryChange={handleCategoryChange} />
        </Col>
        <Col md={9} className="product-view-col">
          <ProductView3x3
            selectedCategories={selectedCategories}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
            wishlistItems={wishlistItems}
            onRemoveFromWishlist={onRemoveFromWishlist}
          />
        </Col>
      </Row>
    </Container>
  );
}
