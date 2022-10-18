import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategorys, getProducts, OrderPrice } from "../../redux/action";
import Card from "../Card/Card";
import style from "./Home.module.css";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar/Navbar";
import Paginado from "../Paginado/Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const productsAll = useSelector((state) => state.productsAll);

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
  };
  const handleSelectPrice = (e) => {
    e.preventDefault();
    dispatch(OrderPrice(e.target.value));
    setPaginaEnEsteMomento(1);
    setOrder(e.target.value);
  };
  return (
    <div>
      <Navbar />
      <div className={style.content}>
        <div className={style.filtros}>
          <select onChange={(e) => handleFilterCategory(e)}>
            <option value="all">Category</option>
            <option value="varios">Varios</option>;
            <option value="mujer">Mujer</option>;
            <option value="hombre">Hombre</option>;
          </select>
          <select onChange={(e) => handleSelectPrice(e)}>
            <option value="all">Price</option>
            <option value="-pr">- Price</option>
            <option value="+pr">+ Price</option>
          </select>
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
