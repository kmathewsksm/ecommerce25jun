import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHeart, FaSearch, FaShoppingCart, FaStar } from "react-icons/fa";
import "./ProductView3x3.css";

export const ProductView3x3 = ({
  selectedCategories,
  onAddToCart,
  onAddToWishlist,
  wishlistItems,
  onRemoveFromWishlist,
}) => {
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

  const wishlistedIds = wishlistItems.map((item) => item.id);

  return (
    <>
      {filteredProducts?.length > 0 && (
        <div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for products"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>
          <hr style={{ color: "white" }} />
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product.id} sm={12} md={4} lg={4} className="mb-4">
                <Link
                  to={`/product/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card className="product-card">
                    <div className="d-flex justify-content-end">
                      <FaHeart
                        color={
                          wishlistedIds?.includes(product.id)
                            ? "red"
                            : "#cbc2c2"
                        }
                        style={{ border: "1px", cursor: "pointer" }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (wishlistedIds?.includes(product.id))
                            onRemoveFromWishlist(product);
                          else onAddToWishlist(product);
                        }}
                      />
                    </div>
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
                        style={{
                          marginBottom: "0 !important",
                          marginTop: "1rem",
                        }}
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
                          <FaStar
                            color="#1D85FC"
                            style={{ marginLeft: "4px" }}
                          />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};
