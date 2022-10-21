import { CONSTANTES } from "./constantes";

const initialState = {
  productsAll: [],
  filterProducts: [],
  detailProduct: {},
  filterPrice: [],
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

function setInLocalStorage(key, state) {
  localStorage.setItem(key, JSON.stringify(state));
  return state;
}

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
      console.log(payload);
      let orderPrice = state.filterProducts;
      let infoPrice = orderPrice.filter((e) => e.price >= payload);
      console.log(infoPrice);

      return {
        ...state,
        productsAll: infoPrice,
      };

    case "FILTER_SIZE":
      let filterSize = state.filterProducts;
      let filtrado =
        payload == "todos"
          ? filterSize
          : filterSize.filter((e) => e.size.includes(payload));
      return { ...state, productsAll: filtrado };

    case "FILTER_TYPE":
      let filterType = state.filterProducts;
      let filtradoo =
        payload == "todos"
          ? filterType
          : filterType.filter((e) => e.type.includes(payload));
      return { ...state, productsAll: filtradoo };

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

    //--------------------------//

    case CONSTANTES.ADD_TO_CART:
      const product = state.productsAll.find((ele) => ele.id === payload);
      const itemExist = state.cart.find((ele) => ele.id === product.id);
      return itemExist
        ? {
            ...state,
            cart: setInLocalStorage(
              "cart",
              state.cart.map((ele) =>
                itemExist.id === ele.id
                  ? { ...ele, cantidad: ele.cantidad + 1 }
                  : ele
              )
            ),
          }
        : {
            ...state,
            cart: setInLocalStorage("cart", [
              ...state.cart,
              { ...product, cantidad: 1 },
            ]),
          };
    case CONSTANTES.DELETE_ONE_PRODUCT:
      const productExist = state.cart.find((ele) => ele.id === payload);
      if (productExist) {
        if (productExist.cantidad > 1) {
          return {
            ...state,
            cart: setInLocalStorage(
              "cart",
              state.cart.map((item) =>
                item.id === productExist.id
                  ? { ...item, cantidad: item.cantidad - 1 }
                  : item
              )
            ),
          };
        }
        return {
          ...state,
          cart: setInLocalStorage(
            "cart",
            state.cart.filter((item) => item.id !== productExist.id)
          ),
        };
      }
      return {
        ...state,
      };
    case CONSTANTES.DELETE_ALL_PRODUCT:
      const existProduct = state.cart.find((ele) => ele.id === payload);
      if (existProduct) {
        return {
          ...state,
          cart: setInLocalStorage(
            "cart",
            state.cart.filter((item) => item.id !== existProduct.id)
          ),
        };
      }
      return {
        ...state,
      };

    case CONSTANTES.CLEAR_CART:
      return {
        ...state,
        cart: setInLocalStorage("cart", []),
      };

    default:
      return { ...state };
  }
}
