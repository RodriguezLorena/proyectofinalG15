import React from "react";
import Cart from "../Cart/Cart";
import style from "./CartList.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeOneProduct, removeAll } from "../../redux/action";

export default function CartList() {
  const cartState = useSelector((state) => state.cart);
  const dispach = useDispatch();

  const deleteCart = (id, todos = false) => {
    if (todos) {
      dispach(removeAll(id));
    } else {
      dispach(removeOneProduct(id));
    }
  };
  const limpiarCart = () => {
    dispach(clearCart());
  };
  return (
    <div className={style.cart}>
      {cartState.length < 1
        ? "Carrito vacio"
        : cartState.slice(0, 3).map((ele) => {
            return <Cart key={ele.id} data={ele} deleteCart={deleteCart} />;
          })}
      <div className={style.contentAll}>
        <NavLink to="/carrito" className={style.viewAll}>
          Mostrar todos
        </NavLink>
      </div>
    </div>
  );
}
