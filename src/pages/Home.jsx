import React from "react";
import data from "../api/data";
import ListProduct from "../components/list-product";
import ErrorBoundary from "../error-handler";
function Home() {
  return (
    <div>
      <ErrorBoundary>
        <ListProduct data={data} />
      </ErrorBoundary>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default Home;
