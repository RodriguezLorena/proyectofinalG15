import React from "react";
import Card from "../Card/Card";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";
import style from "./Landing.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/action";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Landing() {
  const dispatch = useDispatch();
  let productsAll = useSelector((state) => state.productsAll);
  productsAll = productsAll.filter((element) => element.bestSellers === true);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
    <div className={style.content}>
      <Navbar />
      <div className={style.carrusel}>
        <ul>
          <li>
            <img
              src="https://carruselmoda.com/wp-content/uploads/2022/06/Carrusel-moda-envios-gratis-ropa.jpg"
              alt=""
            />
          </li>
          <li>
            <img
              src="https://cdn.shopify.com/s/files/1/0273/7884/3785/articles/que-ropa-favorece-segun-cuerpo_1600x.jpg?v=1599819540"
              alt=""
            />
          </li>
          <li>
            <img
              src="https://media.meer.com/attachments/d3375ae9e0beb2d7b550a04fe6ae2d2d5aadc69d/store/fill/1090/613/5b50f51699c787b0a66dd3c24259c59233be4fe27405b44d9678bac58b9f/Todo-un-armario-del-que-tomar-prestada-la-ropa.jpg"
              alt=""
            />
          </li>
        </ul>
      </div>
      <div className={style.slider}>
        <ul>
          {productsAll &&
            productsAll.map((element) => {
              return (
                <li>
                  <Card
                    name={element.name}
                    image={element.images[0].img}
                    price={element.price}
                    id={element.id}
                    key={element.id}
                  />
                </li>
              );
            })}
        </ul>
      </div>
      <NavLink to="/home" className={style.boton}>
        View all
      </NavLink>
      </div>
      <Footer />
    </div>
  );
}
