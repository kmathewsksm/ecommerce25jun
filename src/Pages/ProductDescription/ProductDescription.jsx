import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import "./ProductDescription.css";

export const ProductDescription = ({ onAddToCart, onAddToWishlist }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="product-description mt-8">
      <Row>
        <Col md={6} className="d-flex justify-content-center">
          <Image src={product.image} className="product-image" rounded />
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <h4 className="text-success">$ {product.price}</h4>
          <div className="rating mb-3">
            <FaStar color="yellow" /> {product.rating.rate}
          </div>
          <p className="text-muted">{product.description}</p>
          <div className="d-flex justify-content-start gap-2 mt-4">
            <Button
              variant="primary"
              onClick={() => onAddToCart(product)}
              className="d-flex align-items-center"
            >
              <FaShoppingCart className="mr-2" />
            </Button>
            <Button
              variant="secondary"
              onClick={() => onAddToWishlist(product)}
              className="d-flex align-items-center"
            >
              <FaHeart className="mr-2" />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
