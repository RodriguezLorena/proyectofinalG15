import React from "react";
import style from "./Card.module.css";
import im from "../../img/camiseta.png";
import { NavLink } from "react-router-dom";

export default function Card({ name, image, price, id }) {
  return (
    <NavLink to={`/product/${id}`} className={style.link}>
      <div className={style.content}>
        <img
          src={
            image ||
            "https://static.wikia.nocookie.net/ben10/images/a/a2/Sinimagen.png/revision/latest?cb=20170610100405&path-prefix=es"
          }
          alt=""
          className={style.fondo}
        />
        <p className={style.view}>View detail</p>
        <h5>{name}</h5>
        <div className={style.precios}>
          <h6>${price}</h6>
          <p>S,M</p>
          <img src={im} alt="" />
        </div>
      </div>
    </NavLink>
  );
}
