import React from "react";
import Card from "../Card/Card";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from "./Landing.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/action";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import vid from "../../img/carusuel.mp4";

export default function Landing() {
  const dispatch = useDispatch();
  let productsAll = useSelector((state) => state.productsAll);
  productsAll = productsAll.filter((element) => element.bestSellers === true);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className={style.content}>
      <Navbar />
      <div className={style.videos}>
        <video src={vid} autoPlay loop className={style.videos}></video>
      </div>
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
      <NavLink to="/home" className={style.boton}>
        {" "}
        View all
      </NavLink>

      <Footer />
    </div>
  );
}
