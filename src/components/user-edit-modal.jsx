import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Container } from "react-bootstrap";
import FetchingSpinner from "./spinner";

function Modal({
  name,
  title,
  btnText,
  changeName,
  changeEmail,
  email,
  handleChange,
  submitHandler,
  toggleShow,
  handleClose,
  show,
  loadingUpdate,
  submitBtnText,
  changeIsAdmin,
  isAdmin,
  ...props
}) {
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        style={{ width: "600px", paddingTop: "20px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fs-4 font-bolder text-muted">
            {!loadingUpdate && title}
          </Offcanvas.Title>
          <div className="d-flex justify-content-space font-bolder text-bold">
            {loadingUpdate && (
              <>
                <FetchingSpinner />
                <div className="text-success"> Updating...</div>
              </>
            )}
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-4">
          <Container>
            <Form onSubmit={submitHandler}>
              <Row className="mb-5">
                <Form.Group as={Col} controlId="name">
                  <Form.Label className="text-muted">Name</Form.Label>
                  <Form.Control value={name} onChange={changeName} />
                </Form.Group>
              </Row>
              <Row className="mb-4">
                <Form.Group as={Col} controlId="email">
                  <Form.Label className="text-muted">Email</Form.Label>
                  <Form.Control value={email} onChange={changeEmail} />
                </Form.Group>
              </Row>

              <Row className="mb-5">
                <Form.Group as={Col} controlId="isAdmin">
                  <Form.Group className="mb-3">
                    <Form.Check
                      value={isAdmin}
                      label="Register as an admin"
                      onChange={changeIsAdmin}
                    />
                  </Form.Group>
                </Form.Group>
              </Row>

              <div className="mb-5 text-center">
                <Button
                  type="submit"
                  className="btn w-50"
                  disabled={loadingUpdate}
                  style={{ height: "50px" }}
                >
                  {submitBtnText}
                </Button>
              </div>
            </Form>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Modal;
