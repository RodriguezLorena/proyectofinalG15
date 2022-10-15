

const initialState = {
  productsAll: [],
  detailProduct: {},
};

export default function reducer(state = initialState, { payload, type }) {
  switch (type) {
    case "GET_PRODUCTS":
      return { ...state, productsAll: payload };

    case "GET_ID":
      return {
        ...state,
        detailProduct: payload,
      };

    case "SEARCH_NAME":
      return { ...state, productsAll: payload };
    default:
      return { ...state };
  }
}
