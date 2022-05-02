import { createContext, useReducer } from "react";

const Store = createContext();
const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => +item._id === +newItem._id
      );
      const finalCartItem = existItem
        ? state.cart.cartItems.map((item) =>
            +item._id === +existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(finalCartItem));
      return { ...state, cart: { ...state.cart, cartItems: finalCartItem } };
    case "REMOVE_FROM_CART":
      const cartItems = state.cart.cartItems.filter(
        (item) => +item._id !== +action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    default:
      return state;
  }
}
function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export { Store, StoreProvider };
