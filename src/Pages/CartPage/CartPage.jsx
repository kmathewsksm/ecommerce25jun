import React, { useEffect, useState} from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { FaStar, FaTrash, FaPlus, FaMinus, FaTimes, FaArrowRight } from "react-icons/fa";
import "./CartPage.css"

export const CartPage = ({ cartItems, onRemoveFromCart, onQuantityChange }) => {
  const [totalAmount, settotalAmount] = useState();

  useEffect(() => {
    let total = 0
    cartItems.forEach(item => {
      total += item.price * item.quantity
    })
    settotalAmount(total)
  }, [cartItems]);
  return (
    <div style={{paddingTop: "120px"}}>
      <h3>Your Cart</h3>
      <hr />
      <div style={{padding: "0.5rem 3.5rem"}}>
        <Row>
          {
            cartItems.map((item, index) => (
              <Col md={12} lg={12} className="d-flex flex-column justify-content-between" style={{border: "1px solid grey", padding: "0.75rem", marginTop: "0.75rem"}}>
                <div className="mb-2 d-flex justify-content-end">
                  <FaTimes color="#282c3f" style={{cursor: "pointer", fontSize: "18px", fontWeight: "100"}} onClick={() => onRemoveFromCart(item)} />
                </div>
                <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="pic-section border p-2">
                <img
                  src={item.image}
                  style={{ maxWidth: "50px" }}
                  alt="logo"
                  />
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                  <span style={{fontWeight: "500", fontSize: "16px", marginLeft: "1rem"}}>{item.title}</span>
                  <span style={{fontWeight: "400", fontSize: "12px", color: "rgb(132 125 125)", marginLeft: "1rem"}}>{item.description}</span>
                  <span style={{fontWeight: "500", color: "#03a685", marginLeft: "1rem"}}>$ {item.price * item.quantity}</span>
                  </div>
                  </div>
                  <div className="d-flex align-items-center flex-column ml-3">
                    Quantity
                    <div className="quantity-section" style={{marginTop: "0.5rem"}}>
                      <FaMinus onClick={() => {
                        if(item.quantity > 1) {
                          onQuantityChange(item, item.quantity - 1)
                        }
                      }} style={{marginRight: "0.75rem", cursor: "pointer", fontSize: "12px"}} />
                      <span style={{fontSize: "16px", fontWeight: "500"}}>{item.quantity}</span>
                      <FaPlus onClick={() => onQuantityChange(item, item.quantity + 1)} style={{marginLeft: "0.75rem", cursor: "pointer", fontSize: "14px"}} />
                    </div>
                  </div>
                  </div>
              </Col>
            ))
          }
        </Row>
        <Row className="mt-3 mb-3">
          <Col md={12} lg={12} className="d-flex justify-content-between" style={{paddingRight: "0", paddingLeft: "0"}}>
            <div>
              <span style={{fontWeight: "500", fontSize: "22px"}}>Total amount <span style={{fontWeight: "500", color: "#03a685"}}>${totalAmount}</span></span>
            </div>
            <Button className="d-flex align-items-center">
              Proceed to checkout <FaArrowRight style={{marginLeft: "0.5rem"}} />
            </Button>
          </Col>
        </Row>
      </div>
      {/* <Row>
        {cartItems.map((item, index) => (
          <Col key={index} md={4}>
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
                    display: "inline",
                  }}
                >
                  <FaStar color="yellow" /> {item.rating.rate}
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
      </Row> */}
    </div>
  );
};
