import Spinner from "react-bootstrap/Spinner";
function FetchingSpinner() {
  return (
    <Spinner
      animation="border"
      role="status"
      variant="success"
      className="text-bold"
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default FetchingSpinner;
