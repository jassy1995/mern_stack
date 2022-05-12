import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { formatter } from "../script/formatter";
import { Link } from "react-router-dom";
import Rating from "./rating";
import axios from "axios";
import { Store } from "../store";

function ListProduct({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const qty = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.count < qty) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity: qty },
    });
  };
  return (
    <Card className="h-100">
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link
          to={`/product/${product._id}`}
          className="text-center text-decoration-none"
        >
          <Card.Title className="mb-2">
            {product.name.length > 15
              ? product.name.slice(0, 15).padEnd(18, ".")
              : product.name}
          </Card.Title>
        </Link>
        <Rating rating={product.rating} review={product.numReviews} />
        <Card.Text className="justify-content-evenly">
          <strong className="text-start fs-5 fw-bolder">
            {formatter(product.price)}
          </strong>
          {product.count === 0 ? (
            <Button variant="light" className="float-end" disabled>
              Out of stock
            </Button>
          ) : (
            <Button
              variant="warning"
              className="float-end"
              onClick={() => addToCartHandler(product)}
            >
              Add to cart
            </Button>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ListProduct;
