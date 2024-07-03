import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { FaStar, FaTrash } from "react-icons/fa";

export const CartPage = ({ cartItems, onRemoveFromCart, onQuantityChange }) => {
  return (
    <div className="mt-2">
      <h3 style={{ justifyContent: "center", display: "flex" }}>Your Cart</h3>
      <hr />
      <Row>
        {cartItems.map((item, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card
              className="mb-4 p-2"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card.Img
                variant="top"
                src={item.image}
                className="product-image"
                style={{ maxHeight: "150px", objectFit: "contain" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{item.title}</Card.Title>
                <Card.Text style={{ fontWeight: "bold", color: "green" }}>
                  $ {item.price}
                </Card.Text>
                <Card.Text
                  style={{
                    marginBottom: "10px",
                    textAlign: "left",
                    width: "max-content",
                    display: "flex",
                    color: "blue",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <FaStar color="#ffc107" /> {item.rating.rate}
                </Card.Text>
                <Card.Text>
                  Quantity :{" "}
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onQuantityChange(item, e.target.value)}
                    min="1"
                  />
                </Card.Text>
                <Card.Text>Total : $ {item.price * item.quantity}</Card.Text>
                <div className="d-flex justify-content-end ">
                  <Button
                    variant="danger"
                    onClick={() => onRemoveFromCart(item)}
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
