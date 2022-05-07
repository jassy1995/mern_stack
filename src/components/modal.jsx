import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Container } from "react-bootstrap";
import FetchingSpinner from "./spinner";

function Modal({
  name,
  title,
  handleChange,
  submitHandler,
  inputValue,
  fileOnchange,
  selectedImage,
  loadingCreate,
  brand,
  category,
  count,
  price,
  description,
  Name,
  slug,
  formRef,

  ...props
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <Button variant="primary" onClick={toggleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        style={{ width: "800px", paddingTop: "20px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fs-4 font-bolder text-muted">
            {!loadingCreate && title}
          </Offcanvas.Title>
          <div className="d-flex justify-content-space font-bolder text-bold">
            {loadingCreate && (
              <>
                <FetchingSpinner />
                <div className="text-success"> Creating...</div>
              </>
            )}
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-4">
          <Container>
            <Form ref={formRef} onSubmit={submitHandler}>
              <Row className="mb-5">
                <Form.Group as={Col} controlId="name">
                  <Form.Label className="text-muted">Product Name</Form.Label>
                  <Form.Control
                    value={inputValue.name}
                    onChange={Name}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="slug">
                  <Form.Label className="text-muted">Slug</Form.Label>
                  <Form.Control
                    value={inputValue.slug}
                    onChange={slug}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-5">
                <Form.Group as={Col} controlId="price">
                  <Form.Label className="text-muted">Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={inputValue.price}
                    required
                    onChange={price}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="count">
                  <Form.Label className="text-muted">Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={inputValue.count}
                    required
                    onChange={count}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-5">
                <Form.Group as={Col} controlId="brand">
                  <Form.Label className="text-muted">Brand</Form.Label>
                  <Form.Select
                    defaultValue={inputValue.brand}
                    value={inputValue.brand}
                    onChange={brand}
                  >
                    <option>Choose brand...</option>
                    <option value="nike">Nike</option>
                    <option value="puma">Puma</option>
                    <option value="adidas">Adidas</option>
                    <option value="Lacoste">Lacoste</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="category">
                  <Form.Label className="text-muted">Category</Form.Label>
                  <Form.Select
                    defaultValue={inputValue.category}
                    value={inputValue.category}
                    onChange={category}
                  >
                    <option>Choose category...</option>
                    <option value="pants">Pant</option>
                    <option value="shirts">Shirt</option>
                    <option value="jackets">Jacket</option>
                    <option value="jeans">Jean</option>
                    <option value="jersey">Jersey</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Form.Group className="mb-5" controlId="image">
                <Form.Label className="text-muted">
                  upload the product image
                </Form.Label>
                <Form.Control
                  type="file"
                  // name={image}
                  value={selectedImage}
                  onChange={fileOnchange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label className="text-muted">
                  describe your product
                </Form.Label>
                <Form.Control
                  value={inputValue.description}
                  as="textarea"
                  rows={3}
                  onChange={description}
                />
              </Form.Group>

              <div className="mb-5 text-center">
                <Button
                  type="submit"
                  className="btn w-50"
                  disabled={loadingCreate}
                  style={{ height: "50px" }}
                >
                  Create
                </Button>
              </div>
              {/* <div className="mb-3">
              Already have an account?{" "}
              <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
            </div> */}
            </Form>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Modal;
