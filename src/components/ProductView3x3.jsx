import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import "./ProductView3x3.css";

export const ProductView3x3 = ({ selectedCategories, onAddToWishlist }) => {
  const [productsList, setProductsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProductsList(response.data);
      } catch (error) {
        console.log("error in data fetching all products", error);
      }
    };
    fetchAllProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = productsList
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)
    );

  return (
    <>
      <div
        style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}
      >
        <input
          style={{ borderRadius: "5px", borderColor: "black", width: "50%" }}
          type="text"
          placeholder="Search for your item"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <hr style={{ color: "white" }} />
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} sm={12} md={4} lg={4} className="mb-4">
            <Card className="product-card">
              <Link to={`/product/${product.id}`}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  className="product-image"
                />
              </Link>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="product-title">
                  {product.title}
                </Card.Title>
                <Card.Text className="product-price">
                  $ {product.price}
                </Card.Text>
                <Card.Text className="product-rating">
                  <FaStar color="#ffc107" />
                  <div style={{ color: "blue" }}>
                    {product.rating.rate}
                  </div>{" "}
                  <div>({product.rating.count} ratings)</div>
                </Card.Text>
                <div className="mt-auto d-flex justify-content-center gap-1">
                  <Button
                    className="bounce-animation"
                    variant="secondary"
                    onClick={() => onAddToWishlist(product)}
                  >
                    <FaHeart />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
