import React, { useEffect, useReducer, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { productReducer, initialState } from "../api/reducers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FetchingSpinner from "../components/spinner";
import ErrorBoundary from "../error-handler";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Rating from "../components/rating";
import { formatter } from "../script/formatter";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/message-box";
import { errorHandler } from "../script/error";
import { Store } from "../store.js";

function ProductDetailPage() {
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

  const imageLarge = {
    maxWidth: "100vh",
  };
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [{ loading, error, product }, dispatch] = useReducer(
    productReducer,
    initialState
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/${id}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: errorHandler(error) });
      }
    };
    fetchData();
  }, [id]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const qty = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.count < qty) {
      window.alert("Sorry, product is out of stock");
      return;
    }
    ctxDispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: qty },
    });
    navigate("/cart");
  };
  return (
    <div className="mt-3">
      <ErrorBoundary>
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
            <MessageBox variant="danger">{error}</MessageBox>
          </div>
        ) : (
          <Row>
            <Col md={6}>
              <img
                variant="img-large"
                src={product.image}
                alt={product.name}
                style={imageLarge}
                width="100%"
                height="90%"
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating rating={product.rating} review={product.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price : {formatter(product.price)}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description : <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price :</Col>
                        <Col>{formatter(product.price)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>status:</Col>
                        <Col>
                          {product.count > 0 ? (
                            <Badge bg="success">In stock</Badge>
                          ) : (
                            <Badge bg="danger">unavailable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.count > 0 && (
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button variant="warning" onClick={addToCartHandler}>
                            Add to cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </ErrorBoundary>
    </div>
  );
}

export default ProductDetailPage;
