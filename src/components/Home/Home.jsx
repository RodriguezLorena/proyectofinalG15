import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/action";
import Card from "../Card/Card";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const productsAll = useSelector((state) => state.productsAll);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
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
              />
            );
          })}
      </div>
    </div>
  );
}
