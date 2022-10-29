import React, { useEffect, useState } from "react";
import style from "./EditProducts.module.css";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { getDetail, desmontarDetalle, putProduct } from "../../redux/action";
import { useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { IoReload } from "react-icons/io5";

export default function EditProducts() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id)).then(() => setState(false));
    return () => {
      dispatch(desmontarDetalle());
    };
  }, [dispatch]);

  const product = useSelector((state) => state.detailProduct);
  const [state, setState] = useState(true);
  const [valuesNew, setValuesNew] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    value: true,
    type: "",
    mainImage: "",
    sizes: [],
    images: [],
    categories: [],
    bestSellers: false,
  });

  const sizess = [
    "s",
    "m",
    "l",
    "xl",
    "U",
    "1",
    "1.5",
    "2",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
  ];

  const handelEditProduct = (e) => {
    e.preventDefault();
    setValuesNew({
      ...valuesNew,
      [e.target.name]: e.target.value,
    });
  };

  function handelMasVendido(e) {
    setValuesNew({
      ...valuesNew,
      bestSellers: e.target.value,
    });
  }

  function handelSelectValue(e) {
    setValuesNew({
      ...valuesNew,
      value: e.target.value,
    });
  }

  function handelSizes(e) {
    setValuesNew({
      ...valuesNew,
      sizes: [...valuesNew.sizes, e.target.value],
    });
  }

  function handelImages(e) {
    setValuesNew({
      ...valuesNew,
      images: [...valuesNew.images, e.target.value],
    });
  }
  function handelCateogoties(e) {
    setValuesNew({
      ...valuesNew,
      categories: [...valuesNew.categories, e.target.value],
    });
  }

  function handelChangueValues() {
    if (valuesNew.value == "1") valuesNew.value = true;
    else valuesNew.value = false;
    if (valuesNew.bestSellers == "1") valuesNew.bestSellers = true;
    else valuesNew.bestSellers = false;
    dispatch(putProduct(valuesNew, id));
    setValuesNew({
      name: "",
      price: 0,
      stock: 0,
      description: "",
      value: true,
      type: "",
      mainImage: "",
      sizes: [],
      images: [],
      categories: [],
      bestSellers: false,
    });
    setTimeout(function () {
      window.location.reload(true);
    }, 2000);
  }

  if (state) {
    return <div>Cargando...</div>;
  }
  return (
    <div>
      <NavBar />
      <div className={style.content}>
        <div className={style.card}>
          <h5> toda la imformacion de el producro </h5>
          <img src={product[0].mainImage} alt="" />
          <p>Nombre: {product[0].name}</p>
          <p>Precio:{product[0].price}</p>
          <p>Tallas: {product[0].sizes.join(", ")}</p>
          <p>stock: {product[0].stock}</p>
          <p>Value: {product[0].value}</p>
          <p>Tipo: {product[0].type}</p>
          <p>Mas vendido: {product[0].bestSellers}</p>
          <p>
            Catrogrias:{" "}
            {product[0].categories[0] && product[0].categories[0].name}
          </p>
          <p>Id: {product[0].id}</p>
          <p>Descripcion: {product[0].description}</p>
        </div>
        <div className={style.productModifi}>
          <h5>Nuevos datos de el producto</h5>
          <form action="">
            <div>
              <label htmlFor="">Nombre</label>
              <input
                type="text"
                value={valuesNew.name}
                name="name"
                onChange={(e) => handelEditProduct(e)}
              />
            </div>
            <div>
              <label htmlFor="">Precio</label>
              <input
                type="text"
                name="price"
                value={valuesNew.price}
                onChange={(e) => handelEditProduct(e)}
              />
            </div>
            <div>
              <label htmlFor="">Talla</label>
              <select onChange={(e) => handelSizes(e)}>
                {sizess.map((x) => {
                  return <option value={x}>{x}</option>;
                })}
              </select>
            </div>
            <div>
              <label htmlFor="">stock</label>
              <input
                type="text"
                name="stock"
                value={valuesNew.stock}
                onChange={(e) => handelEditProduct(e)}
              />
            </div>
            <div>
              <label htmlFor="">Descripcion</label>
              <input
                type="text"
                name="description"
                value={valuesNew.description}
                onChange={(e) => handelEditProduct(e)}
              />
            </div>
            <div>
              <label htmlFor="">Value</label>
              <select name="" id="" onChange={(e) => handelSelectValue(e)}>
                <option name="value" value={1}>
                  true
                </option>
                <option name="value" value={0}>
                  false
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="">Tipo</label>
              <input
                type="text"
                name="type"
                value={valuesNew.type}
                onChange={(e) => handelEditProduct(e)}
              />
            </div>
            <div>
              <label htmlFor="">Mas vendido:</label>
              <select name="" id="" onChange={(e) => handelMasVendido(e)}>
                <option name="bestSellers" value={1}>
                  true
                </option>
                <option name="bestSellers" value={0}>
                  false
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="">Catrogrias:</label>
              <select onChange={(e) => handelCateogoties(e)}>
                <option value="hombre">hombre</option>
                <option value="mujer">mujer</option>
                <option value="niños">niños</option>
                <option value="varios">varios</option>
              </select>
            </div>
          </form>
          <button
            onClick={() => handelChangueValues()}
            className={style.butonSaveChangue}
          >
            guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
