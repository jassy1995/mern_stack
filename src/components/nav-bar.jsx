import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
// import FormControl from "react-bootstrap/FormControl";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import { Search } from "react-bootstrap-icons";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { Store } from "../store";

function NavBar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
  };
  return (
    <div>
      <Navbar bg="light" expand="md" fixed="top">
        <Container fluid>
          <Navbar.Brand to="/">My Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/search">
                <Nav.Link>Products</Nav.Link>
              </LinkContainer>

              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            {/* <Form className="d-flex me-auto align-middle">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">
                <Search />
              </Button>
            </Form> */}
            <div className="d-flex gap-4  me-5">
              <Link className="nav-link" to="/cart">
                Cart{" "}
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    {/* {cart.cartItems.length} */}
                  </Badge>
                )}
              </Link>
              {/* <Link className="nav-link" to="/signin">
                Login
              </Link> */}
            </div>

            {userInfo ? (
              <NavDropdown
                title={userInfo.name}
                id="basic-nav-dropdown"
                className="me-5"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link
                  className="dropdown-item"
                  to="/signin"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
