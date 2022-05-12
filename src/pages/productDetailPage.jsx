import React, {
  useEffect,
  useReducer,
  useContext,
  useRef,
  useState,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import Form from "react-bootstrap/Form";
import Rating from "../components/rating";
import { formatter } from "../script/formatter";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/message-box";
import { errorHandler } from "../script/error";
import { Store } from "../store.js";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toast } from "react-toastify";

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
    height: "70%",
    zIndex: "9999",
  };

  const imageLarge = {
    maxWidth: "100vh",
  };
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(productReducer, initialState);

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
  const { cart, userInfo } = state;
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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      toast.error("Please enter comment and rating");
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: "CREATE_SUCCESS",
      });
      toast.success("Review submitted successfully");
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: "REFRESH_PRODUCT", payload: product });
      window.scrollTo({
        behavior: "smooth",
        top: reviewsRef.current.offsetTop,
      });
    } catch (error) {
      toast.error(errorHandler(error));
      dispatch({ type: "CREATE_FAIL" });
    }
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
                  <h3>{product.name.split("/")[0]}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating rating={product.rating} review={product.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="text-bold">Price</span> :{" "}
                  {formatter(product.price)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="text-bold">Description</span> :{" "}
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col className="text-bold">Price :</Col>
                        <Col>{formatter(product.price)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col className="text-bold">status:</Col>
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
        <div className="my-3">
          <h2 ref={reviewsRef}>Reviews</h2>
          <div className="mb-3">
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
          </div>
          <ListGroup>
            {product.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating rating={review.rating} caption=" "></Rating>
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="my-3">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <h2>Write a customer review</h2>
                <Form.Group className="mb-3" controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Select
                    aria-label="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1- Poor</option>
                    <option value="2">2- Fair</option>
                    <option value="3">3- Good</option>
                    <option value="4">4- Very good</option>
                    <option value="5">5- Excelent</option>
                  </Form.Select>
                </Form.Group>
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Comments"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </FloatingLabel>

                <div className="mb-3">
                  <Button disabled={loadingCreateReview} type="submit">
                    Submit
                  </Button>
                  {loadingCreateReview && <FetchingSpinner />}
                </div>
              </form>
            ) : (
              <MessageBox>
                Please{" "}
                <Link to={`/signin?redirect=/product/${product.slug}`}>
                  Sign In
                </Link>{" "}
                to write a review
              </MessageBox>
            )}
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default ProductDetailPage;
