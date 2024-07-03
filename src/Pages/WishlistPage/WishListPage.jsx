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
    <div className="mt-4 ">
      <h3 style={{ justifyContent: "center", display: "flex" }}>
        Your Wishlist
      </h3>
      <hr />
      <Row>
        {wishlistItems.map((item, index) => (
          <Col key={index} md={4}>
            <Card
              className="mb-2 p-2"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Link to={`/product/${item.id}`}>
                <Card.Img
                  variant="top"
                  src={item.image}
                  className="product-image"
                />
              </Link>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text style={{ fontWeight: "bold", color: "green" }}>
                  $ {item.price}
                </Card.Text>
                <Card.Text
                  style={{
                    marginBottom: "10px",
                    textAlign: "left",

                    width: "max-content",
                    display: "inline",
                  }}
                >
                  <FaStar color="yellow" /> {item.rating.rate}
                </Card.Text>
                <div className="d-flex justify-content-center gap-2">
                  <Button variant="primary" onClick={() => onAddToCart(item)}>
                    <FaShoppingCart />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onRemoveFromWishlist(item)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
