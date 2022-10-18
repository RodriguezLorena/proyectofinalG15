import React from "react";
import style from "./Card.module.css";
import { NavLink } from "react-router-dom";
import meGusta from "../../img/me-gusta.png";
import carrito from "../../img/carrito-de-compras.png";

export default function Card({ name, image, price, id }) {
  return (
    <NavLink to={`/product/${id}`} className={style.link}>
      <div className={style.content}>
        <img src={carrito} alt="carrito" className={style.carrito} />
        <img
          src={
            image ||
            "https://static.wikia.nocookie.net/ben10/images/a/a2/Sinimagen.png/revision/latest?cb=20170610100405&path-prefix=es"
          }
          alt=""
          className={style.fondo}
        />
        <div className={style.meGusta}>
          <img src={meGusta} alt="logo me gusta" />
        </div>
        <h5>{name}</h5>
        <div className={style.talasPrecio}>
          <div className={style.tallas}>
            <p>M</p>
            <p>S</p>
          </div>
          <h6>${price}</h6>
        </div>
      </div>
    </NavLink>
  );
}
