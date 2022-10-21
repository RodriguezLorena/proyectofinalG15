import React from "react";
import Cart from "../Cart/Cart";
import style from "./CartList.module.css";
import { NavLink } from "react-router-dom";

export default function CartList() {
  return (
    <div className={style.cart}>
      <Cart />
      <Cart />
      <div className={style.contentAll}>
        <NavLink to="/carrito" className={style.viewAll}>
          Mostrar todos
        </NavLink>
      </div>
    </div>
  );
}
