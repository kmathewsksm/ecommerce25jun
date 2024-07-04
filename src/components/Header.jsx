import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
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
    <Navbar bg="dark" variant="dark" expand="lg" className={isLoggedIn ? "app-header" : ''}>
      <Container>
        <Navbar.Brand as={Link} to="/">
        <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{ width: "50px" }}
                alt="logo"
              />
          FlixKart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex">
            {isLoggedIn && (
              <>
                <div
                  style={{ display: "flex", gap: "10px", marginRight: "20px" }}
                >
                  <Nav.Link
                    as={Link}
                    to="/cart"
                    className={cartAnimate ? "cart-animate" : ""}
                  >
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <FaShoppingCart color="white" />{" "}
                      <Badge
                        pill
                        bg="danger"
                        className="ms-2 p-1"
                        style={{
                          position: "absolute",
                          top: "-1px",
                          right: "-1px",
                          transform: "translate(50%, -50%)",
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
                      <FaHeart color="white" />{" "}
                      <Badge
                        pill
                        bg="danger"
                        className="ms-2 p-1"
                        style={{
                          position: "absolute",
                          top: "-1px",
                          right: "-1px",
                          transform: "translate(50%, -50%)",
                        }}
                      >
                        {wishlistItems.length}
                      </Badge>
                    </div>
                  </Nav.Link>
                  <div className="d-flex align-items-center" style={{fontSize: "18px", marginTop: "8px", marginLeft: "4px"}}>
               <FaUser color="white" />
              <NavDropdown title={username} id="basic-nav-dropdown" className="user-info" d>
                <NavDropdown.Item style={{color: "black"}} href="#action/3.1">Account</NavDropdown.Item>
              <NavDropdown.Item style={{color: "black"}} href="#action/3.2">
                Addresses
              </NavDropdown.Item>
              <NavDropdown.Item style={{color: "black"}} href="#action/3.3">Orders</NavDropdown.Item>
              <NavDropdown.Divider />
                <NavDropdown.Item onClick={onLogout} style={{color: "black"}}>Logout</NavDropdown.Item>
              </NavDropdown>
              </div>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
