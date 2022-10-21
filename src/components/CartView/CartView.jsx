import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeOneProduct,
  removeAll,
  getProducts,
} from "../../redux/action";
import style from "./CartView.module.css";
import Cart from "../Cart/Cart";
import NavBar from "../NavBar/NavBar";
import { useEffect } from "react";

export default function CartView() {
  const cartState = useSelector((state) => state.cart);
  console.log(cartState, "estado card");
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
    <div>
      <NavBar />
      <div className={style.content}>
        <button onClick={limpiarCart}>Limpiar Carrito</button>
        {cartState.map((ele) => {
          return <Cart key={ele.id} data={ele} deleteCart={deleteCart} />;
        })}
      </div>
    </div>
  );
}
