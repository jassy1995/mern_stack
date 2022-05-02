// import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { formatter } from "../script/formatter";
// import { Star } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Rating from "./rating";
import { useContext } from "react";

function ListProduct({ product, addToCartHandler }) {
  return (
    <Card>
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link
          to={`/product/${product._id}`}
          className="text-center text-decoration-none"
        >
          <Card.Title className="mb-2">{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} review={product.numReviews} />
        <Card.Text className="justify-content-evenly">
          <strong className="text-start fs-5 fw-bolder">
            {formatter(product.price)}
          </strong>
          <Button
            variant="warning"
            className="float-end"
            // onCLick={addToCartHandler}
          >
            Add to cart
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ListProduct;
