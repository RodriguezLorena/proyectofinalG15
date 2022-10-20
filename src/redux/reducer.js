const initialState = {
  productsAll: [],
  filterProducts: [],
  detailProduct: {},
  filterPrice: [],
  productCreado: "inicial",
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

    case "SEARCH_NAME":
      return { ...state, productsAll: payload };
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
      let orderPrice = state.filterPrice;
      let infoPrice = orderPrice.filter(
        (e) => e.price > payload[0] && e.price < payload[1]
      );

      return {
        ...state,
        productsAll: infoPrice,
      };

      case "RECETA_CREADA":
      return {
        ...state,
        productCreado: payload,
      };
    case "RECETA_NO_CREADA":
      return {
        ...state,
        productCreado: payload,
      };

    default:
      return { ...state };
  }
}
