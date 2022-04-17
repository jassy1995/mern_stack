import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { formatter } from "../script/formatter";
import { Star } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import FetchingSpinner from "./spinner";

function ListProduct({ data, loading, error }) {
  const styleLoader = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "fixed",
    left: "0px",
    top: "30px",
    width: "100%",
    height: "100%",
    zIndex: "9999",
  };

  return (
    <>
      <div>
        <Row xs={1} md={3} lg={4} className="g-4">
          {loading ? (
            <div
              style={styleLoader}
              className="flex justify-content-center my-40 fs-3"
            >
              <FetchingSpinner />
              <div className="pl-4 ml-4"> fetching...</div>
            </div>
          ) : error ? (
            <div style={styleLoader} className="fs-3 text-danger">
              {error}
            </div>
          ) : (
            data.map((product) => (
              <Col key={product._id}>
                <Card>
                  <Link to={`/product/${product._id}`}>
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.name}
                    />
                  </Link>
                  <Card.Body>
                    <Link
                      to={`/product/${product._id}`}
                      className="text-center text-decoration-none"
                    >
                      <Card.Title className="mb-2">{product.name}</Card.Title>
                    </Link>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span key={idx}>
                        <Star color="darkorange" size={16} />{" "}
                      </span>
                    ))}
                    <Card.Text className="justify-content-evenly">
                      <strong className="text-start fs-5 fw-bolder">
                        {formatter(product.price)}
                      </strong>
                      <Button variant="success" className="float-end">
                        Add to cart
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>
    </>
  );
}

export default ListProduct;
