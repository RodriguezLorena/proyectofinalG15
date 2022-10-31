import axios from "axios";
import { MdArrowBackIos } from "react-icons/md";
import swal from "sweetalert";
import { CONSTANTES } from "./constantes";
const datosdeploy = "https://velvet.up.railway.app/product";
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

export function getDetail(id) {
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
export function putProduct(payload, id) {
  return async function (dispatch) {
    let respuesta = await axios.put(
      `https://velvet.up.railway.app/product/${id}`,
      payload
    );
    console.log(respuesta.data, "put products");
  };
}

export const getForName = (name) => {
  return async function (dispatch) {
    try {
      if (name) {
        let respuesta = await axios(
          `https://velvet.up.railway.app/products?search=${name}`
        );
        return dispatch({
          type: CONSTANTES.SEARCH_NAME,
          payload: respuesta.data,
        });
      } else {
        swal("INGRESA UN NOMBRE DEL PRODUCTO");
      }
    } catch (error) {
      console.log("ERROR EN LA LLAMADA POR QUERY NOMBRE ", error);
      alert("NO EXISTE El PRODUCTO QUE BUSCA");
    }
  };
};

export function filterByCategorys(payload) {
  return {
    type: CONSTANTES.FILTER_BY_CATEGORYS,
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
    let crearProduct = await axios.post(
      "https://velvet.up.railway.app/product",
      payload
    );
    console.log(crearProduct);
    return {
      type: "PRODUCT_CREATE",
      payload: crearProduct,
    };
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

export function getAllReviews(payload) {
  return async function (dispatch) {
    let traeReviews = await axios.get(
      `https://velvet.up.railway.app/review/${payload}`
    );
    console.log(traeReviews.data);
    return dispatch({
      type: CONSTANTES.GET_ALL_REVIEW,
      payload: traeReviews.data,
    });
  };
}

///----------POST FORM------------
export function postProducts(payload) {
  console.log(payload, " payload de postProducts");

  return async function (dispatch) {
    const postJson = await axios.post(`http://localhost:3001/product`, payload);
    return dispatch({
      type: CONSTANTES.POST_PRODUCT,
      payload: postJson,
    });
  };
}

//--------------IMAGENES-------------

export function postImages() {
  // console.log(payload, ' payload de post imagenes');

  return async function (dispatch) {
    const postJson1 = await axios.post(`http://localhost:3001/product/images`);
    return dispatch({
      type: CONSTANTES.POST_IMAGES,
    });
  };
}

//-------------LOGIN------------------//
export function login(payload) {
  //console.log(payload, "loginnnnn");
  return async function (dispatch) {
    const respuesta = await axios.post(
      "https://velvet.up.railway.app/login",
      payload
    );
    console.log(respuesta)
    // const users = await axios("https://velvet.up.railway.app/users");
    // const user = users.data.filter(
    //   (element) => element.id === respuesta.data.id
    // );
    // console.log(respuesta.data, "respuesta");
    // if (respuesta.data.hasOwnProperty("menssage")) {
    //   return swal({
    //     title: "Usuario y/o password son incorrectos",
    //     icon: "error",
    //   });
    // }
    // if (user[0].role == "admin") {
    //   swal({
    //     title: "Bienvenido ADMIN",
    //     icon: "success",
    //   });
    //   return dispatch({ type: "LOGIN", payload: respuesta.data });
    // }
    // swal({
    //   title: "Ingreasaste correctamente",
    //   icon: "success",
    // });
    return dispatch({ type: "LOGIN", payload: respuesta.data });
  };
}
export function creatAcount(payload) {
  console.log(payload, "creandoooo");
  return async function (dispatch) {
    const respuesta = await axios.post(
      "https://velvet.up.railway.app/users",
      payload
    );
    const users = await axios("https://velvet.up.railway.app/users");
    const user = users.data.filter(
      (element) => element.userName === payload.userName
    );
    swal({
      title: "Usuario crado correctamente",
      icon: "success",
    });
    return dispatch({ type: "LOGIN", payload: user[0] });
  };
}

export function clearUser(payload) {
  swal({
    title: "Sesion cerrada correctamente",
    icon: "success",
  });
  return { type: "CLEAR_USER", payload };
}

//---------------------Usuarios---------------------//

export const putUser = (id, payload) => {
  return async (dispatch) => {
    console.log("tendria que ser los input", payload);
    let json = await axios.put(
      `https://velvet.up.railway.app/users/${id}`,
      payload
    );
    console.log("esto es el put", json);
    return dispatch({
      type: CONSTANTES.PUT_USER,
      payload: json.data,
    });
  };
};

export const getUser = (payload) => {
  console.log(payload)
  return async (dispatch) => {
    let json = await axios.get("https://velvet.up.railway.app/users", 
   { headers: {
      authorization: 'Bearer '+`${payload}`
    }}
    );
    return dispatch({
      type: CONSTANTES.GET_USER,
      payload: json.data,
    });
  };
};
export const Verify = (id,payload)=>{
  console.log(payload)
  return async (dispatch)=>{
    let json = await axios.put(`https://velvet.up.railway.app/verification/${id}`,payload);
    return dispatch({
      type : "VERIFY",
      payload: json.data
    })
  }
}
export const getUserId = (id) => {
  return {
    type: CONSTANTES.GET_USER_ID,
    payload: id,
  };
};
