import React, { useEffect, useReducer } from "react";
// import data from "../api/data";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListProduct from "../components/list-product";
import ErrorBoundary from "../error-handler";
import { productReducer, initialState } from "../api/reducers";
import FetchingSpinner from "../components/spinner";
import MessageBox from "../components/message-box";
import axios from "axios";
import logger from "use-reducer-logger";
import { Helmet } from "react-helmet-async";
import { errorHandler } from "../script/error";

function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(
    logger(productReducer),
    initialState
  );

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

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");

        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        console.log(error);
        dispatch({ type: "FETCH_FAIL", payload: errorHandler(error) });
      }
    };
    fetchData();
    console.log(products);
  }, []);

  // const { state, dispatch: ctxDispatch } = useContext();
  // const addToCartHandler = () => {
  //   ctxDispatch({
  //     type: "ADD_TO_CART",
  //     payload: { ...product, quantity: 1 },
  //   });
  // };

  return (
    <div className="mt-4">
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
            <Helmet>
              <title>Home</title>
            </Helmet>
            <h1>Feature Product</h1>
            {products.map((product) => (
              <Col
                key={product._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-3"
              >
                <ListProduct
                  product={product}
                  // addToCartHandler={addToCartHandler}
                />
              </Col>
            ))}
          </Row>
        )}
      </ErrorBoundary>
    </div>
  );
}

export default HomePage;
