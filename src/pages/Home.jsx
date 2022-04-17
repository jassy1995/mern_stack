import React, { useEffect, useReducer } from "react";
// import data from "../api/data";
import ListProduct from "../components/list-product";
import ErrorBoundary from "../error-handler";
import { productReducer, initialState } from "../api/reducers";
import axios from "axios";
import logger from "use-reducer-logger";
function Home() {
  const [{ loading, error, products }, dispatch] = useReducer(
    logger(productReducer),
    initialState
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data.products });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
    console.log(products);
  }, []);

  return (
    <div>
      <h1>Feature Product</h1>
      <ErrorBoundary>
        <ListProduct data={products} loading={loading} error={error} />
      </ErrorBoundary>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default Home;
