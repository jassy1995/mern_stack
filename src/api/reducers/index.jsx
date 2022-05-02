export const initialState = {
  products: [],
  loading: true,
  error: "",
  product: {},
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        ...(Array.isArray(action.payload) && { products: action.payload }),
        ...(typeof action.payload === "object" && { product: action.payload }),
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
