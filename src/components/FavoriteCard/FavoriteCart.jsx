import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import style from "./FavoriteCart.module.css";

export default function FavoriteCart() {
  return (
    <div className={style.content}>
      <img
        src="https://tienda.guantexindustrial.com.ar/713-large_default/remera-algodon-jersey-blanco-talle-m.jpg"
        alt="imagen de el peroducto"
      />
      <h3>Nombre de el producto</h3>
      <dir className={style.carrito}>
        <MdOutlineShoppingCart size="30" />
      </dir>
    </div>
  );
}
