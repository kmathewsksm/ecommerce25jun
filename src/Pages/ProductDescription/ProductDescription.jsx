import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import "./ProductDescription.css";

export const ProductDescription = ({ onAddToCart, onAddToWishlist }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(product);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="product-description mt-8">
      <Row>
        <Col md={6} className="d-flex justify-content-center">
          <div
            style={{
              border: "1px solid",
              borderRadius: "5px",
              padding: "10px",
              width: "100%",
              justifyContent: "center",
              display: "flex",
              position: "relative",
            }}
          >
            <Image src={product.image} className="product-imag" rounded />
            <FaHeart
              onClick={handleWishlistClick}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                color: isWishlisted ? "red" : "grey",
                fontSize: "1.5em",
                border: "1px solid grey circle",
                padding: "2px",
              }}
            />
          </div>
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <h4 className="text-success">$ {product.price}</h4>
          <div className="rating mb-3">
            <FaStar color="#ffc107" /> {product.rating.rate}
          </div>
          <p className="text-muted">{product.description}</p>
          <div className="d-flex justify-content-start mt-4">
            <Button
              variant="primary"
              onClick={() => onAddToCart(product)}
              className="d-flex align-items-center gap-2"
            >
              <FaShoppingCart className="mr-2" /> Add to Cart
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
