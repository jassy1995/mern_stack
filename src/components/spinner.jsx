import Spinner from "react-bootstrap/Spinner";
function FetchingSpinner() {
  return (
    <Spinner animation="border" role="status" className="mr-3 pr-4">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default FetchingSpinner;
