import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/action";
import Card from "../Card/Card";
import style from "./Home.module.css";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar/Navbar";

export default function Home() {
  const dispatch = useDispatch();
  const productsAll = useSelector((state) => state.productsAll);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className={style.content}>
        <div className={style.filtros}>
          <h4>Filtros</h4>
        </div>
        <div className={style.cards}>
          {productsAll &&
            productsAll.map((element) => {
              return (
                <Card
                  name={element.name}
                  image={element.image}
                  price={element.price}
                  id={element.id}
                  key={element.id}
                />
              );
            })}
        </div>
        <Footer />
      </div>
    </div>
  );
}
