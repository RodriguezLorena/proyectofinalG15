import React from "react";
import OrderCard from "../OrderCard/OrderCard";
import style from "./OrderList.module.css";

export default function OrderList() {
  return (
    <div className={style.content}>
      <OrderCard />
    </div>
  );
}
