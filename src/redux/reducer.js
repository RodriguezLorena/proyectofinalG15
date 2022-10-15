import { Action } from "@remix-run/router";

const initialState = {
  productsAll: [],
  filterProducts: [],
  detailProduct: {},
  filterPrice: [],
};

export default function reducer(state = initialState, { payload, type }) {
  switch (type) {
    case "GET_PRODUCTS":
      return { ...state, productsAll: payload, filterProducts: payload };

    case "GET_ID":
      return {
        ...state,
        detailProduct: payload,
      };
    case "FILTER_BY_CATEGORYS":
      let info = state.filterProducts;
      var dataC =
        payload === "all"
          ? info
          : info.filter((e) => e.category.includes(payload));
      return {
        ...state,
        productsAll: dataC,
        filterPrice: dataC,
      };
    case "ORDER_PRICE":
      let order = state.filterPrice;

      if (payload === "+pr") {
        order.sort((a, b) => (a.price < b.price ? 1 : -1));
      }
      if (payload === "-pr") {
        order.sort((a, b) => (a.price > b.price ? 1 : -1));
      }

      return {
        ...state,
        productsAll: order,
      };
    default:
      return { ...state };
  }
}
