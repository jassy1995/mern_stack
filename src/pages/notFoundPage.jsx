import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="d-flex justify-content-center align-middle">
      <div className="col-md-12 text-center align-middle">
        <span className="display-1 d-block">404</span>
        <div className="mb-4 lead  align-middle">
          The page you are looking for was not found.
        </div>
        <Link to="/" className="btn btn-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
export default NotFoundPage;
