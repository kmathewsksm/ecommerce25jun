import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import "./Header.css";

export function Header({
  cartItems,
  wishlistItems,
  username,
  onLogout,
  isLoggedIn,
  cartAnimate,
  wishlistAnimate,
}) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
            style={{ width: "50px" }}
            alt="logo"
          />
          Ecommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isLoggedIn && (
              <>
                <div
                  style={{ display: "flex", gap: "10px", marginRight: "10px" }}
                >
                  <Nav.Link
                    as={Link}
                    to="/cart"
                    className={cartAnimate ? "cart-animate" : ""}
                  >
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <FaShoppingCart />{" "}
                      <Badge
                        pill
                        bg="danger"
                        className="ms-2"
                        style={{
                          position: "absolute",
                          top: "3px",
                          right: "1px",
                          transform: "translate(50%, -50%)",
                          fontSize: "0.6rem",
                        }}
                      >
                        {cartItems.length}
                      </Badge>
                    </div>
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/wishlist"
                    className={wishlistAnimate ? "wishlist-animate" : ""}
                  >
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <FaHeart />{" "}
                      <Badge
                        pill
                        bg="danger"
                        className="ms-2"
                        style={{
                          position: "absolute",
                          top: "3px",
                          right: "1px",
                          transform: "translate(50%, -50%)",
                          fontSize: "0.6rem",
                        }}
                      >
                        {wishlistItems.length}
                      </Badge>
                    </div>
                  </Nav.Link>
                </div>
              </>
            )}

            {isLoggedIn ? (
              <NavDropdown title={username} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
