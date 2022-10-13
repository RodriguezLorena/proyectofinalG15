const initialState = {
  productsAll: [],
  detaialProduct: {},
};

export default function reducer(state = initialState, { payload, type }) {
  switch (type) {
    case "GET_PRODUCTS":
      return { ...state, productsAll: payload };
    default:
      return { ...state };
  }
}
