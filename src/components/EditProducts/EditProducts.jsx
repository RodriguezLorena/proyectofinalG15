import React, { useEffect, useState } from "react";
import style from "./EditProducts.module.css";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { getDetail, desmontarDetalle, putProduct } from "../../redux/action";
import { useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { IoReload } from "react-icons/io5";
import swal from "sweetalert";

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
  const cargaCategories = ["mujer", "hombre", "varios", "niños"];
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
  //VALIDACIONES:
  const [validador, setValidador] = useState({});

  const validacion = (valuesNew) => {
    let validar = {};
    let noContieneNumero = /[1-9]/;
    let sinEspacios = /[\s]/;

    if (valuesNew.name.length > 50)
      validar.name = "NO PUEDE TENER MAS DE 50 CARACTERES";
    if (valuesNew.name.length < 5)
      validar.name = "NECESITA TENER UN MINIMO DE 5 CARACTERES";
    if (sinEspacios.test(valuesNew.type[0]))
      validar.name = "TIENE QUE PONER TEXTO VALIDO, LOS ESPACIOS NO SE VALEN";
    if (noContieneNumero.test(valuesNew.name))
      validar.name = "NO PUEDE CONTENER NUMEROS";

    if (valuesNew.description.length > 100)
      validar.description = "NO PUEDE TENER MAS DE 100 CARACTERES";
    if (valuesNew.description.length < 20)
      validar.description = "NECESITA TENER UN MINIMO DE 30 CARACTERES";
    if (sinEspacios.test(valuesNew.description[0]))
      validar.description = "NO PUEDE SER ESPACIOS EN BLANCO";

    if (Number(valuesNew.price) < 1)
      validar.price = "TIENE QUE SER UN PRECIO MAYOR A $USD 0 ";
    if (Number(valuesNew.price) > 500)
      validar.price = "NO PUEDE SER MAYOR A $USD 500";

    if (Number(valuesNew.stock) < 1)
      validar.stock = "TIENE QUE SER UN VALOR MAYOR A 0 ";
    if (Number(valuesNew.stock) > 10000000)
      validar.stock = "NO ES RECIONAL LA CANTIDAD QUE INTENTA PONER";

    if (valuesNew.type.length > 15)
      validar.type = "NO PUEDE TENER MAS DE 15 CARACTERES";
    if (valuesNew.type.length < 5)
      validar.type = "NECESITA TENER UN MINIMO DE 5 CARACTERES";
    if (sinEspacios.test(valuesNew.type[0]))
      validar.type = "TIENE QUE PONER TEXTO VALIDO, LOS ESPACIOS NO SE VALEN";
    if (noContieneNumero.test(valuesNew.type))
      validar.type = "NO PUEDE CONTENER NUMEROS";

    return validar;
  };
  const handelEditProduct = (e) => {
    e.preventDefault();
    setValuesNew({
      ...valuesNew,
      [e.target.name]: e.target.value,
    });
    setValidador(
      validacion({
        ...valuesNew,
        [e.target.name]: e.target.value,
      })
    );
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

  const handelSizes = (e) => {
    const selec = valuesNew.sizes.filter(
      (elemento) => elemento !== e.target.innerHTML
    );
    if (selec.includes(e.target.value)) {
      swal({
        title: "UPSS!!!",
        text: "Ese talle ya fue seleccionado",
        icon: "error",
        className: "swal-modal",
        className: "swal-title",
      });
    } else {
      setValuesNew({
        ...valuesNew,
        sizes: [...valuesNew.sizes, e.target.value],
      });
      setValidador(
        validacion({
          ...valuesNew,
          sizes: [...valuesNew.sizes, e.target.value],
        })
      );
    }
    console.log("aca esta el nuevo producto ", valuesNew.sizes);
  };

  const eliminarSelect = (e) => {
    const seleccion = valuesNew.sizes.filter(
      (elemento) => elemento !== e.target.innerHTML
    );
    setValuesNew({
      ...valuesNew,
      sizes: seleccion,
    });
    setValidador(
      validacion({
        ...valuesNew,
        sizes: [...seleccion],
      })
    );
  };

  function handelImages(e) {
    setValuesNew({
      ...valuesNew,
      images: [...valuesNew.images, e.target.value],
    });
  }
  // function handelCateogoties(e) {
  //   setValuesNew({
  //     ...valuesNew,
  //     categories: [...valuesNew.categories, e.target.value],
  //   });
  // }

  const handelCateogoties = (e) => {
    const selec = valuesNew.categories.filter(
      (elemento) => elemento !== e.target.innerHTML
    );
    if (selec.includes(e.target.value)) {
      swal({
        title: "UPSS!!!",
        text: "Esa categoria ya fue seleccionada",
        icon: "error",
        className: "swal-modal",
        className: "swal-title",
      });
    } else {
      setValuesNew({
        ...valuesNew,
        categories: [...valuesNew.categories, e.target.value],
      });
      setValidador(
        validacion({
          ...valuesNew,
          category: [...valuesNew.categories, e.target.value],
        })
      );
    }
  };

  //manipulo la eliminacion de categorias
  const eliminarSelectCategory = (e) => {
    const seleccion = valuesNew.categories.filter(
      (elemento) => elemento !== e.target.innerHTML
    );

    setValuesNew({
      ...valuesNew,
      categories: seleccion,
    });

    setValidador(
      validacion({
        ...valuesNew,
        categories: [...seleccion],
      })
    );
  };

  function handelChangueValues() {
    if (valuesNew.value == "1") valuesNew.value = true;
    else valuesNew.value = false;
    if (valuesNew.bestSellers == "1") valuesNew.bestSellers = true;
    else valuesNew.bestSellers = false;
    console.log(valuesNew, "valoresss");
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
    // setTimeout(function () {
    //   window.location.reload(true);
    // }, 2000);
  }

  if (state) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="bg-white">
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
              {validador.name ? <p>{validador.name}</p> : <p> </p>}
            </div>
            <div>
              <label htmlFor="">Precio</label>
              <input
                type="number"
                name="price"
                value={valuesNew.price}
                onChange={(e) => handelEditProduct(e)}
              />
              {validador.price ? <p>{validador.price}</p> : <p> </p>}
            </div>
            <div>
              <label htmlFor="">Talla</label>
              <select onChange={(e) => handelSizes(e)}>
                {sizess.map((x) => {
                  return <option value={x}>{x}</option>;
                })}
              </select>
              <div>
                <ul>
                  {valuesNew.sizes.map((elemento) => (
                    <li key={elemento} onClick={(e) => eliminarSelect(e)}>
                      {elemento}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <label htmlFor="">stock</label>
              <input
                type="number"
                name="stock"
                value={valuesNew.stock}
                onChange={(e) => handelEditProduct(e)}
              />
              {validador.stock ? <p>{validador.stock}</p> : <p> </p>}
            </div>
            <div>
              <label htmlFor="">Descripcion</label>
              <input
                type="text"
                name="description"
                value={valuesNew.description}
                onChange={(e) => handelEditProduct(e)}
              />
              {validador.description ? (
                <p>{validador.description}</p>
              ) : (
                <p> </p>
              )}
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
              {validador.type ? <p>{validador.type}</p> : <p> </p>}
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
                {cargaCategories &&
                  cargaCategories.map((elemento, index) => {
                    return (
                      <option key={index} value={elemento}>
                        {elemento}
                      </option>
                    );
                  })}
              </select>
              <div>
                <ul>
                  {valuesNew.categories.map((elemento) => (
                    <li
                      key={elemento}
                      onClick={(e) => eliminarSelectCategory(e)}
                    >
                      {elemento}
                    </li>
                  ))}
                </ul>
              </div>
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
