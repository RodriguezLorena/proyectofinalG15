import { Action } from "@remix-run/router";

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
    default:
      return { ...state };
  }
}
