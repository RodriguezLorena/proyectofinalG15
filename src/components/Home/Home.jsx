import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategorys, getProducts, OrderPrice } from "../../redux/action";
import { BsFillFilterSquareFill } from "react-icons/bs";
import Card from "../Card/Card";
import style from "./Home.module.css";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar/Navbar";
import Paginado from "../Paginado/Paginado";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

export default function Home() {
  const dispatch = useDispatch();
  const productsAll = useSelector((state) => state.productsAll);
  const [value, setValue] = useState([100, 1000]);
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

  const handleSelectPrice = (e, newValue) => {
    e.preventDefault();
    setValue(newValue);
    dispatch(OrderPrice([value[0], value[1]]));
    setPaginaEnEsteMomento(1);
  };
  return (
    <div>
      <Navbar />
      <div className={style.content}>
        <div className={style.filtros}>
          <div className={style.inconfilter}>
            <BsFillFilterSquareFill size="25" />
            <h2>FILTER:</h2>
          </div>
          <div>
            <select onChange={(e) => handleFilterCategory(e)}>
              <option value="all">All Products</option>
              <option value="varios">Varieties</option>;
              <option value="mujer">woman</option>;
              <option value="hombre">Men</option>;
            </select>
          </div>
          <div>
            <div
              style={{
                margin: "auto",
                display: "block",
                width: "fit-content",
              }}
            >
              <Typography id="range-slider" gutterBottom>
                Select Price Range:
              </Typography>
              <Slider
                value={value}
                onChange={handleSelectPrice}
                valueLabelDisplay="auto"
                min={0}
                max={13000}
              />
              Your range of Price is between ${value[0]} /- and ${value[1]} /-
            </div>
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


