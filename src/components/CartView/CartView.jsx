import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeOneProduct, removeAll } from "../../redux/action";
import style from "./CartView.module.css";
import Cart from "../Cart/Cart";
import NavBar from "../NavBar/NavBar";

export default function CartView() {
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
    <div className={style.content}>
      <button onClick={limpiarCart}>Limpiar Carrito</button>
      {cartState.map((ele) => {
        return <Cart key={ele.id} data={ele} deleteCart={deleteCart} />;
      })}
    </div>
  );
}
