import axios from "axios";
import { CONSTANTES } from "./constantes";

const dataa = [
  {
    id: "1",
    name: "Juego de sabanas",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20220826/1788/35937010.jpeg?26911",
      },
    ],
    price: 12000,
    stock: 30,
    description:
      "sabanas niza 2 1/2 pl. pack x 5 de sabanas súper económicas. 50% algodon- 50% poliester. para colchon de 140x25x190. bolsa pvc medidas finales.",
    value: true,
    category: "varios",
    bestSellers: true,
    type: "hogar",

    size: ["1", "1.5", "2"],
  },
  {
    id: "2",
    name: "Juego de cortinas floreadas largas",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20220823/1788/34208889.jpeg?26911",
      },
    ],
    price: 1900,
    stock: 15,
    description:
      "medida 1,50 x 2,10 cada paño. diseño ilustrativo. gran oferta!",
    value: true,
    category: "varios",
    bestSellers: true,
    type: "hogar",

    size: ["1", "1.5", "2"],
  },
  {
    id: "3",
    name: "Acolchado doble faz",
    images: [{ img: "" }],
    price: 4500,
    stock: 13,
    description:
      "para 2 plazas y media. 2,20 x 2,40. súper amplios. térmicos y generan mucho calor para el invierno. doble faz en rojo liso y negro liso. súper lavables",
    value: true,
    category: "varios",
    bestSellers: true,
    type: "hogar",

    size: ["1", "1.5", "2"],
  },
  {
    id: "4",
    name: "acolchado grueso",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20190422/1788/51745125.jpeg?26911",
      },
    ],
    price: 1900,
    stock: 15,
    description: "color rojo y negro",
    value: true,
    category: "varios",
    bestSellers: true,
    type: "hogar",

    size: ["1", "1.5", "2"],
  },
  {
    id: "5",
    name: "Toallon gigante ",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20220204/1788/48429214.jpeg?26911",
      },
    ],
    price: 400,
    stock: 30,
    description:
      "rayas marca wossen medida 1,00 x 1,50 cm 100% algodon. super absorvente",
    value: true,
    category: "varios",
    bestSellers: true,
    type: "hogar",

    size: ["1.5"],
  },
  {
    id: "6",
    name: "Toallas de mano medidas",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20190804/1788/60413045.jpeg?26911",
      },
    ],
    price: 1900,
    stock: 15,
    description:
      "27 cm x 43 cm composición: 100% algodón gramaje: 400 gr/m2 ideal para souvenirs, gimnasios, colegios, carteras, etc. excelentes terminaciones",
    value: true,
    category: "varios",
    bestSellers: true,
    type: "hogar",

    size: ["1"],
  },
  {
    id: "7",
    name: "Edredon acolchado",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20220530/1788/68049585.jpeg?26911",
      },
    ],
    price: 1900,
    stock: 15,
    description:
      "flannel con corderito 2 plazas y media medida: 2,30 x 2,50 super abrigado",
    value: true,
    category: "varios",
    bestSellers: false,
    type: "hogar",
    size: ["1", "1.5", "2"],
  },
  {
    id: "8",
    name: "Sandalia maru",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20220902/2367/18826060.jpg?3831",
      },
    ],
    price: 4800,
    stock: 15,
    description: "",
    value: true,
    category: "mujer",
    bestSellers: true,
    type: "cuero",

    size: ["37", "38", "40", "41"],
  },
  {
    id: "9",
    name: "Remeron zero",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20221007/2167/11159140.webp?25332",
      },
    ],
    price: 2280,
    stock: 53,
    description: "",
    value: true,
    category: "hombre",
    bestSellers: true,
    type: "remera",

    size: ["1", "1.5", "2"],
  },
  {
    id: "10",
    name: "Remera estampada",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20221004/1865/57656997.webp?44635",
      },
    ],
    price: 1900,
    stock: 35,
    description: "Remera de algodon",
    value: true,
    category: "mujer",
    bestSellers: false,
    type: "remera",

    size: ["s", "m", "x", "xl"],
  },
  {
    id: "11",
    name: "Remera estampada",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20221004/1865/57656997.webp?44635",
      },
    ],
    price: 1800,
    stock: 15,
    description: "algodon color azul",
    value: true,
    category: "mujer",
    type: "remera",
    bestSellers: false,
    size: ["s", "m", "x", "xl"],
  },
  {
    id: "12",
    name: "Joggers",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20220907/1865/85533855.webp?44635",
      },
    ],
    price: 6300,
    stock: 32,
    description: "Joggers de gabardina elastizada",
    value: true,
    category: "hombre",
    type: "pantalon",
    bestSellers: true,
    size: ["s", "m", "x", "xl"],
  },
  {
    id: "13",
    name: "Canguro",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20220928/1865/60670853.webp?44635",
      },
    ],
    price: 5500,
    stock: 123,
    description: "Canguro rustico estampados",
    value: true,
    category: "hombre",
    type: "pantalon",
    bestSellers: true,
    size: ["s", "m", "x", "xl"],
  },
  {
    id: "14",
    name: "Buzo",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20220920/1865/71020376.webp?44635",
      },
    ],
    price: 6300,
    stock: 32,
    description: "Buzo cuello redondo rustico liso",
    value: true,
    category: "mujer",
    type: "buzos",
    bestSellers: false,
    size: ["s", "m", "x"],
  },
  {
    id: "15",
    name: "Blusita cruzada",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20220902/1672/95345279.jpeg?26982",
      },
    ],
    price: 3190,
    stock: 64,
    description: "blusita frida ondas",
    value: true,
    category: "mujer",
    type: "remera",
    bestSellers: false,
    size: ["s", "m", "x", "xl"],
  },
  {
    id: "16",
    name: "Remera jersey ",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20221013/2116/65392865.webp?22188",
      },
    ],
    price: 6300,
    stock: 32,
    description: "remera blanca asdasda",
    value: true,
    category: "mujer",
    type: "remera",
    bestSellers: false,
    size: ["s", "m", "x"],
  },
  {
    id: "17",
    name: "Musculosa evase ",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20220928/2116/92585409.webp?22188",
      },
    ],
    price: 1500,
    stock: 32,
    description: "Musculosa evase c/est smile today",
    value: true,
    category: "mujer",
    type: "remera",
    bestSellers: false,
    size: ["s", "x", "xl"],
  },
  {
    id: "18",
    name: "Blusa sin manga ",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20220930/1607/20738610.webp?20082",
      },
    ],
    price: 6300,
    stock: 32,
    description: "Tipo de tela: Poplin, poplin estampado",
    value: true,
    category: "mujer",
    type: "remera",
    bestSellers: false,
    size: ["s", "x"],
  },
  {
    id: "19",
    name: "Blusa",
    images: [{ img: "" }],
    price: 2500,
    stock: 6,
    description: "Tipo de tela: viscosa, corte mariposa con brillos",
    value: true,
    category: "mujer",
    type: "remera",
    bestSellers: false,
    size: ["s", "m", "x", "xl"],
  },
  {
    id: "20",
    name: "Blusa importada con aplique con brillo",
    images: [{ img: "" }],
    price: 6300,
    stock: 32,
    description: "Tipo de tela: Acetato",
    value: true,
    category: "mujer",
    type: "remera",
    bestSellers: false,
    size: ["s", "m", "x", "xl"],
  },
  {
    id: "21",
    name: "Gorra impermeable medida",
    images: [{ img: "" }],
    price: 2240,
    stock: 32,
    description: "56 cm de circunferencia regulable",
    value: true,
    category: "mujer",
    type: "accesorio",
    bestSellers: false,
    size: ["s", "m", "x"],
  },
  {
    id: "22",
    name: "Caderin elastizado",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20221013/2251/50071761.webp?183617",
      },
    ],
    price: 1340,
    stock: 122,
    description: "hebilla romboide medida hebilla: 12,5 x 2,5 cm",
    value: true,
    category: "varios",
    type: "accesorio",
    bestSellers: false,
    size: ["s", "m", "x", "xl"],
  },
  {
    id: "23",
    name: "Cinto gamuzado con strass",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20221012/2251/59415382.webp?183621",
      },
    ],
    price: 6300,
    stock: 32,
    description: "talle unico regulable del 34 al 42 ancho: 2,6 cm",
    value: true,
    category: "varios",
    type: "accesorios",
    bestSellers: false,
    size: ["s", "m", "x", "xl"],
  },
  {
    id: "24",
    name: "Billetera clutch reptil",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20221011/2251/77137077.webp?183621",
      },
    ],
    price: 3030,
    stock: 32,
    description: "medidas: 20,5 x 10 x 2,6 cm",
    value: true,
    category: "varios",
    type: "accesorios",
    bestSellers: false,
    size: ["U"],
  },
  {
    id: "25",
    name: "Pulcera eco cuero con tachas",
    images: [
      {
        img: "https://netivooregon.s3.amazonaws.com/attach/modelo/20220919/2251/70436617.webp?183702",
      },
    ],
    price: 1150,
    stock: 32,
    description: "medidas largo 40 cm ancho 1.5 cm",
    value: true,
    category: "varios",
    type: "accesorios",
    bestSellers: false,
    size: ["U"],
  },
];

export function getProducts() {
  return async function (dispatch) {
    try {
      const data = dataa;
      return dispatch({ type: "GET_PRODUCTS", payload: data });
    } catch (error) {
      console.log(error, "error en la ruta principal");
    }
  };
}

export function GetDetail(id) {
  return async function (dispatch) {
    try {
      let infoId = dataa.filter((e) => e.id === id);
      return dispatch({
        type: "GET_ID",
        payload: infoId,
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
      const search = dataa.filter((element) =>
        element.name.toLowerCase().includes(name.toLowerCase())
      );
      return dispatch({ type: "SEARCH_NAME", payload: search });
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
