import { createContext, useReducer } from "react";

const Store = createContext();
const initialState = {
  cart: { cartItems: [] },
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
      return { ...state, cart: { ...state.cart, cartItems: finalCartItem } };
    case "REMOVE_FROM_CART":
      return {};
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
