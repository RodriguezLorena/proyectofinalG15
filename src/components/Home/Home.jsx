import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategorys,
  getProducts,
  OrderPrice,
  filterSize,
  filterType,
} from "../../redux/action";
import Card from "../Card/Card";
import style from "./Home.module.css";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const productsAll = useSelector((state) => state.productsAll);
  const [range, setRange] = useState(0);
  const [Order, setOrder] = useState("");

  //CORTE PARA EL PAGINADO:
  const [paginaEnEsteMomento, setPaginaEnEsteMomento] = useState(1);
  const cantidadPorPagina = 12;
  const indiceUno = paginaEnEsteMomento * cantidadPorPagina;
  const ultimoIndice = indiceUno - cantidadPorPagina;
  const productsList = productsAll.slice(ultimoIndice, indiceUno);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleFilterCategory = (e) => {
    e.preventDefault();
    dispatch(filterByCategorys(e.target.value));
    setPaginaEnEsteMomento(1);
  };

  const handleSelectPrice = (e) => {
    e.preventDefault();
    setRange(e.target.value);
    dispatch(OrderPrice(range));
    setPaginaEnEsteMomento(1);
  };

  function handelFilterSize(e) {
    e.preventDefault();
    dispatch(filterSize(e.target.value));
    setPaginaEnEsteMomento(1);
  }

  function handelFilterType(e) {
    e.preventDefault();
    dispatch(filterType(e.target.value));
    setPaginaEnEsteMomento(1);
  }

  return (
    <div>
      <NavBar />
      <div className={style.content}>
        <div className={style.filters}>
          <h2>Filtros:</h2>
          <div className={style.contentFilterCategory}>
            <h3 className={style.titleFilters}>Productos</h3>
            <select onChange={(e) => handleFilterCategory(e)}>
              <option value="all">Todos los productos</option>
              <option value="varios">Variedades</option>;
              <option value="mujer">Mujer</option>;
              <option value="hombre">Hombre</option>;
            </select>
          </div>
          <div>
            <div className={style.contentFilterPrice}>
              <h3 className={style.titleFilters}>Rango de precios:</h3>
              <input
                type="range"
                onChange={(e) => handleSelectPrice(e)}
                min="0"
                max="13000"
                className={style.range}
              />

              <h4>El rango de precios es de</h4>
              <div className={style.rangePrecie}>
                <p className={style.rangeText}>$0</p>
                <p>a</p>
                <p className={style.rangeText}>{range}</p>
              </div>
            </div>
          </div>

          <div className={style.fiterSize}>
            <h3 className={style.titleFilters}>Talla</h3>
            <select name="" id="" onChange={(e) => handelFilterSize(e)}>
              <option value="todos">Todos</option>
              <option value="m">M</option>
              <option value="s">S</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
            </select>
          </div>

          <div className={style.filterType}>
            <h3 className={style.titleFilters}>Tipo</h3>
            <select name="" id="" onChange={(e) => handelFilterType(e)}>
              <option value="todos">Todos</option>
              <option value="hogar">Hogar</option>
              <option value="remera">Remeras</option>
              <option value="pantalon">Pantalones</option>
              <option value="buzos">Buzos</option>
              <option value="accesorio">Accesorios</option>
            </select>
          </div>
        </div>
        <div className={style.cards}>
          {productsList &&
            productsList.map((element) => {
              return (
                <Card
                  name={element.name}
                  image={element.images[0].img}
                  price={element.price}
                  id={element.id}
                  key={element.id}
                />
              );
            })}
        </div>
      </div>

      <Paginado
        setPaginaEnEsteMomento={setPaginaEnEsteMomento}
        cantidadPorPagina={cantidadPorPagina}
        paginaEnEsteMomento={paginaEnEsteMomento}
      />
      <Footer />
    </div>
  );
}
