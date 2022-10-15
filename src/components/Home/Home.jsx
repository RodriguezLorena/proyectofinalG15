import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategorys, getProducts, OrderPrice } from "../../redux/action";
import Card from "../Card/Card";
import style from "./Home.module.css";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar/Navbar";

export default function Home() {
  const dispatch = useDispatch();
  const productsAll = useSelector((state) => state.productsAll);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [Order, setOrder] = useState("");

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
    setPageCurrent(1);
    setOrder(e.target.value);
  };
  return (
    <div className={style.content}>
      <Navbar />

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
        {productsAll &&
          productsAll.map((element) => {
            return (
              <Card
                name={element.name}
                image={element.image}
                price={element.price}
                key={element.id}
              />
            );
          })}
      </div>
      <Footer />
    </div>
  );
}
