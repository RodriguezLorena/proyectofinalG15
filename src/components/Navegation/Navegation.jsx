import React from "react";
import style from "./Navegation.module.css";
import { NavLink } from "react-router-dom";

export default function Navegation({ home, products }) {
  return (
    <div className={style.contentNavegation}>
      <ul>
        <li className={home == true ? style.botonHover : style.boton}>
          <NavLink to="/">Inicio</NavLink>
        </li>
        <li className={products == true ? style.botonHover : style.boton}>
          <NavLink to="/home">Ver todos los productos</NavLink>
        </li>
      </ul>
    </div>
  );
}
