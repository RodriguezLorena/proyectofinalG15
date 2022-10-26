import { CONSTANTES } from "./constantes";

const initialState = {
  productsAll: [],
  filterProducts: [],
  detailProduct: {},
  filterPrice: [],
  estadoType: [],
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

    case CONSTANTES.SEARCH_NAME:
      console.log("ACA ESTA PAYLOAD ", payload);
      if (!payload) {
        return alert("NO SE ENCUENTRA UN PRODUCTO CON ESE NOMBRE");
      } else {
        console.log("ENCONTRE ALGO ", payload);
        return {
          ...state,
          productsAll: payload,
        };
      }

    case "FILTER_BY_CATEGORYS":
      let info = state.filterProducts;
      var dataC =
        payload === "all"
          ? info
          : info.filter((e) =>
              e.categories.map((e) => e.name).includes(payload)
            );
      return {
        ...state,
        productsAll: dataC,
        filterPrice: dataC,
      };

    case "ORDER_PRICE":
      console.log(payload);
      let orderPrice = state.filterPrice;
      let infoPrice = orderPrice.filter((e) => e.price <= payload);
      console.log(infoPrice);
      let orderPrice2 = state.filterProducts;
      let infoPrice2 = orderPrice2.filter((e) => e.price <= payload);

      let orderPrice3 = state.estadoType;
      let infoPrice3 = orderPrice3.filter((e) => e.price <= payload);
      return {
        ...state,
        productsAll: infoPrice3.length
          ? infoPrice3
          : infoPrice.length
          ? infoPrice
          : infoPrice2,
      };

    case "FILTER_SIZE":
      let filterSize = state.filterPrice;
      let filtrado =
        payload == "all"
          ? filterSize
          : filterSize.filter((e) => e.sizes.includes(payload));

      let filterSize2 = state.filterProducts;
      let filtrado2 =
        payload === "all"
          ? filterSize2
          : filterSize2.filter((e) => e.sizes.includes(payload));

      let filterSize3 = state.estadoType;
      let filtrado3 =
        payload === "all"
          ? filterSize3
          : filterSize3.filter((e) => e.sizes.includes(payload));
      return {
        ...state,
        productsAll: filtrado3.length
          ? filtrado3
          : filtrado.length
          ? filtrado
          : filtrado2,
      };

    case "FILTER_TYPE":

      let filterType = state.filterPrice;
      let filtradoo = payload === "all"
          ? filterType
          : filterType.filter((e) => e.type === payload);   
       console.log("ESTOY EN EL REDUCER ", filtradoo);
      let filterType2 = state.filterProducts;
      console.log("ESTOY EN EL REDUCER 2 ", filterType2);
      let filtradoo2 =
        payload === "all"
          ? filterType2
          : filterType2.filter((e) => e.type === payload);
          console.log("ACA ESTA TYPE ",filtradoo2)
      return {
        ...state,
        productsAll: filtradoo.length ? filtradoo : filtradoo2,
        estadoType: filtradoo.length ? filtradoo : filtradoo2,
      };

    case "PRODUCT_CREATE":
      return {
        ...state,
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
