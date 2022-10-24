import { CONSTANTES } from "./constantes";

const initialState = {
  productsAll: [],
  filterProducts: [],
  detailProduct: {},
  filterPrice: [],
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotal: localStorage.getItem("cartTotal")
    ? JSON.parse(localStorage.getItem("cartTotal"))
    : 0,
  cartTotalItems: JSON.parse(localStorage.getItem("cartTotalItems")) || 0,
};

function setInLocalStorage(key, state) {
  localStorage.setItem(key, JSON.stringify(state));
  return state;
}

function calcularTotal(arrayDeProduct) {
  if (!arrayDeProduct.length) return 0;
  let total = 0;
  for (let i = 0; i < arrayDeProduct.length; i++) {
    total = total + arrayDeProduct[i].price * arrayDeProduct[i].cantidad;
  }
  return total;
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
      let newCart = itemExist
        ? state.cart.map((ele) =>
            itemExist.id === ele.id
              ? { ...ele, cantidad: ele.cantidad + 1 }
              : ele
          )
        : [...state.cart, { ...product, cantidad: 1 }];

      return {
        ...state,
        cart: setInLocalStorage("cart", newCart),
        cartTotal: setInLocalStorage("cartTotal", calcularTotal(newCart)),
        cartTotalItems: setInLocalStorage(
          "cartTotalItems",
          state.cartTotalItems + 1
        ),
      };
    case CONSTANTES.DELETE_ONE_PRODUCT:
      const productExist = state.cart.find((ele) => ele.id === payload);
      const newCart2 =
        productExist && productExist.cantidad > 1
          ? state.cart.map((item) =>
              item.id === productExist.id
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
            )
          : productExist
          ? state.cart.filter((item) => item.id !== productExist.id)
          : state.cart;

      return {
        ...state,
        cart: setInLocalStorage("cart", newCart2),
        cartTotal: setInLocalStorage("cartTotal", calcularTotal(newCart2)),
        cartTotalItems: setInLocalStorage(
          "cartTotalItems",
          state.cartTotalItems - 1
        ),
      };
    case CONSTANTES.DELETE_ALL_PRODUCT:
      const existProduct = state.cart.find((ele) => ele.id === payload);
      const newCart3 = existProduct
        ? state.cart.filter((item) => item.id !== existProduct.id)
        : state.cart;
      return {
        ...state,
        cart: setInLocalStorage("cart", newCart3),
        cartTotal: setInLocalStorage("cartTotal", calcularTotal(newCart3)),
        cartTotalItems: setInLocalStorage(
          "cartTotalItems",
          state.cartTotalItems - existProduct.cantidad
        ),
      };

    case CONSTANTES.CLEAR_CART:
      return {
        ...state,
        cart: setInLocalStorage("cart", []),
        cartTotal: setInLocalStorage("cartTotal", 0),
        cartTotalItems: setInLocalStorage("cartTotalItems", 0),
      };
    case CONSTANTES.DESMONTAR_DETALLE:
      return {
        ...state,
        detailProduct: {},
      };
    default:
      return { ...state };
  }
}
