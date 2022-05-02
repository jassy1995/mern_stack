import Alert from "react-bootstrap/Alert";
function MessageBox({ variant, children }) {
  return <Alert variant={variant || "info"}>{children}</Alert>;
}

export default MessageBox;
