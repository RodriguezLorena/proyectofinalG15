import axios from "axios";
import { CONSTANTES } from "./constantes";


const datosdeploy= "https://velvet.up.railway.app/product"
export function getProducts() {
  return async function (dispatch) {
    try {
      const data = (await axios(datosdeploy)).data;
      return dispatch({ type: "GET_PRODUCTS", payload: data });
    } catch (error) {
      console.log(error, "error en la ruta principal");
    }
  };
}

export function GetDetail(id) {
  return async function (dispatch) {
    try {
      let infoId = await axios.get(`${datosdeploy}/${id}`);
      return dispatch({
        type: "GET_ID",
        payload: infoId.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getForName(name) {
  return async function (dispatch) {
    try {
      console.log(name);
      const search = await axios.get(`datosdeploy?name=${name}`);
      search.filter((element)=> element.name.toLowerCase().includes(name.toLowerCase()))
      return dispatch({
        type: "GET_NAME",
        payload: search,
      });

      
    } catch (error) {
      console.log(error, "ruta search fallo");
    }
  };
}
export function filterByCategorys(payload) {
  return {
    type: "FILTER_BY_CATEGORYS",
    payload,
  };
}
export function OrderPrice(payload) {
  return {
    type: "ORDER_PRICE",
    payload,
  };
}

export function filterSize(payload) {
  return {
    type: "FILTER_SIZE",
    payload,
  };
}

export function filterType(payload) {
  return {
    type: "FILTER_TYPE",
    payload,
  };
}

export const formularioDeCreacion = async (payload) => {
  try {
    console.log("ACA ESTA PAYLOAD FORMULARIO ", JSON.stringify(payload));
    let crearProduct = await axios.post(
      "https://velvet.up.railway.app/product",
      payload
    );
    return crearProduct;
  } catch (error) {
    console.log("ERROR EN LA RUTA DE CREACION ", error);
  }
};
//-------------------------------------//

export function addToCart(payload) {
  return {
    type: CONSTANTES.ADD_TO_CART,
    payload,
  };
}
export function removeOneProduct(id) {
  return {
    type: CONSTANTES.DELETE_ONE_PRODUCT,
    payload: id,
  };
}
export function removeAll(id) {
  return {
    type: CONSTANTES.DELETE_ALL_PRODUCT,
    payload: id,
  };
}
export function clearCart() {
  return {
    type: CONSTANTES.CLEAR_CART,
  };
}

export function desmontarDetalle() {
  return {
    type: CONSTANTES.DESMONTAR_DETALLE,
  };
}
