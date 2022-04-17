import React from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { formatter } from "../script/formatter";
import { Star } from "react-bootstrap-icons";

function ListProduct({ data }) {
  return (
    <>
      <div>
        <h1>Feature Product</h1>
        <Row xs={1} md={3} lg={4} className="g-4">
          {data.products.map((product) => (
            <Col key={product._id}>
              <Card>
                <a href={`/product/${product._id}`}>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                  />
                </a>
                <Card.Body>
                  <a
                    href={`/product/${product._id}`}
                    className="text-center text-decoration-none"
                  >
                    <Card.Title className="mb-2">{product.name}</Card.Title>
                  </a>
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
          ))}
        </Row>
      </div>
    </>
  );
}

export default ListProduct;
