import React from "react";
import style from "./Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import CartView from "../CartView/CartView";

export default function Cart({ data, deleteCart }) {
  const { id, name, price, images, cantidad } = data;
  return (
    <div className={style.content}>
      <div className={style.contentButonDelate}>
        <MdOutlineDelete
          size="30px"
          className={style.butonDelate}
          onClick={() => deleteCart(id)}
        />
        <button onClick={() => deleteCart(id, true)}>Eliminar el item</button>
      </div>
      <img src={images[0].img} alt="" />
      <div className={style.preceTitle}>
        <h3>{name}</h3>
        <p>
          {" "}
          $ {price} x {cantidad}{" "}
        </p>
        <p>Total del mismo producto: {price * cantidad}</p>
      </div>
      <div className={style.butons}>
        <button>Comprar ya</button>
        <NavLink className={style.viewDetail}>Ver detalles</NavLink>
      </div>
    </div>
  );
}
