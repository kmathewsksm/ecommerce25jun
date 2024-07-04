import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import "./ProductDescription.css";

export const ProductDescription = ({ onAddToCart, onAddToWishlist, wishlistItems, onRemoveFromWishlist }) => {
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

  const wishlistedIds = wishlistItems.map((item) => item.id)

  return (
    <Container className="product-description">
      <Row>
        <Col md={4} className="d-flex flex-column justify-content-center border p-3 pic-section">
          <div className="d-flex justify-content-end" style={{cursor: "pointer"}}>
                <FaHeart color={wishlistedIds?.includes(product.id) ? "red" : "#cbc2c2"} onClick={() => {
                  if(wishlistedIds?.includes(product.id)) onRemoveFromWishlist(product)
                  else onAddToWishlist(product)
                }} />
            </div>
            <div className="d-flex justify-content-center">
          <Image src={product.image} className="product-page-image" rounded />
          </div>
        </Col>
        <Col md={8}>
          <h3>{product.title}</h3>
          <p className="text-muted">{product.description}</p>
          <div className="rating mb-3 d-flex align-items-center">
            <span style={{fontWeight: "bold"}}>{product.rating.rate}</span>
            <FaStar color="#1D85FC" style={{marginLeft: "4px"}} /> <span style={{fontWeight: "400", fontSize: "16px", marginLeft: "4px"}}>({product.rating.count} ratings)</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between gap-2 mt-4">
          <h4>$ {product.price} <span class="price-info">inclusive of all taxes</span></h4>
            <Button
              onClick={() => onAddToCart(product)}
              className="d-flex align-items-center"
              style={{backgroundColor:"#1D85FC"}}
            >
              <FaShoppingCart style={{marginRight: "8px"}} /> Add to cart
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
