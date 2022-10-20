import React from "react";
import Cart from "../Cart/Cart";
import style from "./CartList.module.css";

export default function CartList() {
  return (
    <div className={style.content}>
      <div className={style.cart}>
        <Cart />
      </div>
    </div>
  );
}
