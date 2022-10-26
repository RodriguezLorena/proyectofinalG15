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
import Navegation from "../Navegation/Navegation";

export default function Home() {
  const dispatch = useDispatch();
  const productsAll = useSelector((state) => state.productsAll);
  console.log("aca esta productsAll", productsAll);
  const [range, setRange] = useState(0);
  const [Order, setOrder] = useState("");

  //CORTE PARA EL PAGINADO:
  const [paginaEnEsteMomento, setPaginaEnEsteMomento] = useState(1);
  const cantidadPorPagina = 12;
  const indiceUno = paginaEnEsteMomento * cantidadPorPagina;
  const ultimoIndice = indiceUno - cantidadPorPagina;
  const productsList = productsAll.slice(ultimoIndice, indiceUno);
   
  
  //PROBANDO CAMBIOS DE FILTROS:
 const auxiliar=[]
 const data = productsAll?.map((elemento)=> elemento.categories).flat()
 const algo = data?.map((elemento)=> elemento.name)
 auxiliar.push(algo)
 console.log("aca esta algo", auxiliar)
    
 const result = auxiliar.reduce((acc,item)=>{
  if(!acc.includes(item)){
    acc.push(item);
  }
  return acc;
},[])


    console.log("ACA ESTA FILTRADO ", result)

 
 


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
      <Navegation home={false} products={true} />
      <div className={style.content}>
        <div className={style.filters}>
          <h2>Filtros:</h2>
          <div className={style.contentFilterCategory}>
            <h3 className={style.titleFilters}>Productos</h3>
            <select onChange={(e) => handleFilterCategory(e)}>
              <option value="all">Todos los productos</option>
             
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
                  image={element.mainImage}
                  price={element.price}
                  id={element.id}
                  sizes={element.sizes}
                  categories={element.categories}
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
