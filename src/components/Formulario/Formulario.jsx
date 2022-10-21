import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  formularioDeCreacion,
  getProducts
} from "../../redux/action";
import { Link, useNavigate } from "react-router-dom";

import style from "./Formulario.module.css";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";
import swal from "sweetalert"
import "../../App.css"
import SubirImg from "../SubirImg/SubirImg";

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
        title:"BRAVO!!!",
        text: "El nuevo producto se creo exitosamente",
        icon: "success",
        className: "swal-modal",
        className:"swal-title"
      });
      setTimeout(() => {
        navegacionAutomatica("/home");
      }, 1000);
    }
    if (creacion === "noCreada") {
      swal({
        title:"UPSS!!!",
        text: "Algo salio mal, no se pudo crear el producto",
        icon: "error",
        className: "swal-modal",
        className:"swal-title"
      });
    }
  }, [creacion, navegacionAutomatica]);

  const [nuevoProduct, setNuevoProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    value: true,
    images:[]
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



  const manipuladorDeCreacion = (e) => {
    e.preventDefault();
    if (Object.keys(validador).length) {
      swal({
        title:"UPS!!!",
        text: "Algun campo le quedo sin rellenar",
        icon: "error",
        className: "swal-modal",
        className:"swal-title"
      });
    } else {
      if (Object.keys(validacion(nuevoProduct)).length) {
        swal({
        title:"OH, OH!!!",
        text: "Creo que se olvido de cargar los datos, los campos no deben estar vacios",
        icon: "error",
        className: "swal-modal",
        className:"swal-title"
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
    if (
      productsAll.find(
        (elemento) =>
          elemento.name === nuevoProduct.name
      )
    ) {
      const productoExistente = productsAll.find(
        (elemento) =>
          elemento.name === nuevoProduct.name
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

    if (!nuevoProduct.images) {
      validar.images = "IMAGEN ES REQUERIDA";
    } else if (
      !/(?:(?:https?:\/\/))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/=]*(\.jpg|\.png|\.jpeg|\.webp))/.test(
        nuevoProduct.images
      )
    ) {
      validar.images = "INGRESE UNA URL VALIDA";
    }

   
    return validar;
  };

  return (
    <div>
        <Navbar/>
        
      <div className={style.contenedor}>
      <div><h2 className={style.title}>Cargar Producto</h2></div>
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
            {/* <label>
              IMAGEN:
              <input
                type="text"
                name="images"
                value={nuevoProduct.images}
                placeholder="COLOQUE UNA IMAGEN"
                onChange={(e) => manipuladorInput(e)}
              />
            </label> */}
            <SubirImg/>
            {validador.images ? (
              <p className={style.validacion}>{validador.images}</p>
            ) : (
              <p className={style.validacion}> </p>
            )}
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
      <Footer/>
    </div>
  );
};

export default Formulario;
