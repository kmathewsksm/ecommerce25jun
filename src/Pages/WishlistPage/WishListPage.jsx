import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { FaHeart, FaTrash, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export const WishlistPage = ({
  wishlistItems,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  return (
    <div style={{ paddingTop: "120px" }}>
      <h3>Your Wishlist</h3>
      <hr />
      <Row>
        {wishlistItems.map((product, index) => (
          <Col key={index} md={4}>
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card className="product-card">
                <div className="d-flex justify-content-end"></div>
                <Card.Img
                  variant="top"
                  src={product.image}
                  className="product-image"
                />
                <Card.Body
                  className="d-flex flex-column justify-content-between"
                  style={{ paddingBottom: "0" }}
                >
                  <div>
                    <Card.Title
                      className="product-title"
                      style={{ fontSize: "16px" }}
                    >
                      {product.title}
                    </Card.Title>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ marginBottom: "0 !important", marginTop: "1rem" }}
                  >
                    <div>
                      <span style={{ fontWeight: "500", color: "#03a685" }}>
                        $ {product.price}
                      </span>
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      {product.rating.rate}
                      <FaStar color="#1D85FC" style={{ marginLeft: "4px" }} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};
