import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formularioDeCreacion, getProducts } from "../../redux/action";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import style from "./Formulario.module.css";

import swal from "sweetalert";
import "../../App.css";
import SubirImg from "../SubirImg/SubirImg";
import SubirPrincipal from "../SubirImg/SubirPrincipal";

const Formulario = () => {
  const dispatch = useDispatch();

  const [creacion, setCreacion] = useState("inicial");

  const productsAll = useSelector((state) => state.productsAll);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const navegacionAutomatica = useNavigate();

  useEffect(() => {
    if (creacion === "creada") {
      swal({
        title: "BRAVO!!!",
        text: "El nuevo producto se creo exitosamente",
        icon: "success",
        className: "swal-modal",
        className: "swal-title",
      });
      setTimeout(() => {
        navegacionAutomatica("/home");
      }, 1000);
    }
    if (creacion === "noCreada") {
      swal({
        title: "UPSS!!!",
        text: "Algo salio mal, no se pudo crear el producto",
        icon: "error",
        className: "swal-modal",
        className: "swal-title",
      });
    }
  }, [creacion, navegacionAutomatica]);

  const [nuevoProduct, setNuevoProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    value: true,
    type: "",
    mainImage: "https://i.pinimg.com/236x/58/11/f4/5811f41de74bdc7c867926c1ee8297a4.jpg",
    size: [],
    image: ["Imagen random"],
    category:"",
  });

  const manipuladorInput = (e) => {
    setNuevoProduct({
      ...nuevoProduct,
      [e.target.name]: e.target.value,
    });
    setValidador(
      validacion({
        ...nuevoProduct,
        [e.target.name]: e.target.value,
      })
    );
  };
  

  const talles = ["s", "m", "l", "xl", "1","1.5", "2", "36", "37", "38", "39", "40", "41" ];

  const manipuladorSelectSize = (e) => {
    const selec = nuevoProduct.size.filter(
      (elemento) => elemento !== e.target.innerHTML
    );
    console.log("ACA ESTA EL NUEVO PRODUCTO ", selec);
    if (selec.includes(e.target.value)) {
      swal({
        title: "UPSS!!!",
        text: "Ese talle ya fue seleccionado",
        icon: "error",
        className: "swal-modal",
        className: "swal-title",
      });
    } else {
      setNuevoProduct({
        ...nuevoProduct,
        size: [...nuevoProduct.size, e.target.value],
      });
      setValidador(
        validacion({
          ...nuevoProduct,
          size: [...nuevoProduct.size, e.target.value],
        })
      );
    }
    console.log("aca esta el nuevo producto ", nuevoProduct.size);
  };

  const eliminarSelect = (e) => {
    const seleccion = nuevoProduct.size.filter(
      (elemento) => elemento !== e.target.innerHTML
    );

    setNuevoProduct({
      ...nuevoProduct,
      size: seleccion,
    });

    setValidador(
      validacion({
        ...nuevoProduct,
        size: [...seleccion],
      })
    );
  };

 

  const manipuladorDeCreacion = (e) => {
    e.preventDefault();
    if (Object.keys(validador).length) {
      swal({
        title: "UPS!!!",
        text: "Algun campo le quedo sin rellenar",
        icon: "error",
        className: "swal-modal",
        className: "swal-title",
      });
    } else {
      if (Object.keys(validacion(nuevoProduct)).length) {
        swal({
          title: "OH, OH!!!",
          text: "Creo que se olvido de cargar los datos, los campos no deben estar vacios",
          icon: "error",
          className: "swal-modal",
          className: "swal-title",
        });
      } else {
        formularioDeCreacion(nuevoProduct)
          .then(() => {
            setCreacion("creada");
          })
          .catch(() => {
            setCreacion("noCreada");
          });
      }
    }
  };

  //VALIDACIONES:
  const [validador, setValidador] = useState({});

  const validacion = (nuevoProduct) => {
    let validar = {};
    let noContieneNumero = /[1-9]/;
    let sinEspacios = /[\s]/;

    if (nuevoProduct.name.length > 50)
      validar.name = "NO PUEDE TENER MAS DE 50 CARACTERES";
    if (nuevoProduct.name.length < 5)
      validar.name = "NECESITA TENER UN MINIMO DE 5 CARACTERES";
    if (sinEspacios.test(nuevoProduct.name[0]))
      validar.name = "TIENE QUE PONER TEXTO VALIDO, LOS ESPACIOS NO SE VALEN";
    if (noContieneNumero.test(nuevoProduct.name))
      validar.name = "NO PUEDE CONTENER NUMEROS";
    if (productsAll.find((elemento) => elemento.name === nuevoProduct.name)) {
      const productoExistente = productsAll.find(
        (elemento) => elemento.name === nuevoProduct.name
      );
      validar.name = (
        <Link to={`/product/${productoExistente.id}`}>
          YA TENEMOS ESTE PRODUCTO EN NUESTRA BASE DE DATOS{" "}
          {productoExistente.name}
        </Link>
      );
    }

    if (nuevoProduct.description.length > 100)
      validar.description = "NO PUEDE TENER MAS DE 100 CARACTERES";
    if (nuevoProduct.description.length < 30)
      validar.description = "NECESITA TENER UN MINIMO DE 30 CARACTERES";
    if (sinEspacios.test(nuevoProduct.description[0]))
      validar.description = "NO PUEDE SER ESPACIOS EN BLANCO";

    if (Number(nuevoProduct.price) < 1)
      validar.price = "TIENE QUE SER UN PRECIO MAYOR A $1 ";
    if (Number(nuevoProduct.price) > 150000)
      validar.price = "NO PUEDE SER MAYOR A 150.000";

    if (Number(nuevoProduct.stock) < 1)
      validar.stock = "TIENE QUE SER UN VALOR MAYOR A 1 ";

    return validar;
  };

  return (
    <div>
      <NavBar />
      <div className={style.contenedor}>
        <div>
          <h2 className={style.title}>Cargar Producto</h2>
        </div>
        <form className={style.contenedorForm} onSubmit={manipuladorDeCreacion}>
          <div className={style.form}>
            <label>
              NOMBRE:
              <input
                id="nombreInput"
                type="text"
                name="name"
                value={nuevoProduct.name}
                placeholder="ESCRIBE EL NOMBRE DEL PRODUCTO AQUÍ"
                onChange={(e) => manipuladorInput(e)}
              />
            </label>
            {validador.name ? (
              <p className={style.validacion}>{validador.name}</p>
            ) : (
              <p className={style.validacion}> </p>
            )}
          </div>
          <div className={style.form}>
            <label>
              DESCRIPCION:
              <textarea
                type="text"
                name="description"
                value={nuevoProduct.description}
                placeholder="ESCRIBA UNA DESCRIPCION DEL PRODUCTO"
                onChange={(e) => manipuladorInput(e)}
              />
            </label>
            {validador.description ? (
              <p className={style.validacion}>{validador.description}</p>
            ) : (
              <p className={style.validacion}> </p>
            )}
          </div>

          <div className={style.form}>
            <label>
              PRECIO:
              <input
                type="number"
                name="price"
                value={nuevoProduct.price}
                placeholder="COLOQUE EL PRECIO"
                onChange={(e) => manipuladorInput(e)}
              />
            </label>
            {validador.price ? (
              <p className={style.validacion}>{validador.price}</p>
            ) : (
              <p className={style.validacion}> </p>
            )}
          </div>
          <div className={style.form}>
            <label>
              STOCK
              <input
                type="number"
                name="stock"
                value={nuevoProduct.stock}
                placeholder="COLOQUE EL STOCK"
                onChange={(e) => manipuladorInput(e)}
              />
            </label>
            {validador.stock ? (
              <p className={style.validacion}>{validador.stock}</p>
            ) : (
              <p className={style.validacion}> </p>
            )}
          </div>

          <div className={style.form}>
            <label>
              Tipos
              <input
                type="text"
                name="type"
                value={nuevoProduct.type}
                placeholder="COLOQUE EL TIPO DE PRODUCTO"
                onChange={(e) => manipuladorInput(e)}
              />
            </label>
            {validador.stock ? (
              <p className={style.validacion}>{validador.stock}</p>
            ) : (
              <p className={style.validacion}> </p>
            )}
          </div>

          <div className={style.form}>
            <label>
              SELECCIONA UN TALLE:
              <select
                defaultValue={"default"}
                onChange={(e) => manipuladorSelectSize(e)}
              >
                <option value="default" disabled>
                  ELEGIR TALLA:
                </option>
                {talles &&
                  talles.map((elemento, index) => {
                    return (
                      <option key={index} value={elemento}>
                        {elemento}
                      </option>
                    );
                  })}
              </select>
            </label>
          </div>
          <div>
            <ul>
              {nuevoProduct.size.map((elemento) => (
                <li key={elemento} onClick={(e) => eliminarSelect(e)}>
                  {elemento}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label> categoregoria </label>
           <input type="text" name="category"  value={nuevoProduct.category}
                placeholder="COLOQUE LA CATEGORIA EJ: CAMISA"
                onChange={(e) => manipuladorInput(e)}/>
          </div>
          <div>
            <SubirPrincipal/>
          </div>

          <div className={style.contentBtn}>
            <button
              className={style.boton}
              onClick={(e) => {
                manipuladorDeCreacion(e);
              }}
            >
              CREAR PRODUCTO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
