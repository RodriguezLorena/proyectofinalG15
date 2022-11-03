import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import style from "./OrderCard.module.css";

export default function OrderCard() {
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.orders);
  const orderProducts = useSelector((state) => state.ordersProducts);
  const productsAll = useSelector((state) => state.productsAll);
  const res = order.filter((element) => element.user_id === user.id);
  const ids = res.map((element) => element.order_id);

  const array = [];
  for (let i = 0; i < orderProducts.length; i++) {
    for (let j = 0; j < orderProducts.length - 1; j++) {
      if (orderProducts[i].orderOrderId == ids[j]) {
        array.push(orderProducts[i]);
      }
    }
  }

  // const products = orderProducts.filter((element) => {
  //   return element.orderOrderId === ids[0];
  // });
  // console.log(products, "products");
  // console.log(ids, "ids");
  let products = [];
  for (let i = 0; i < productsAll.length; i++) {
    for (let j = 0; j < productsAll.length - 1; j++) {
      if (productsAll[i]?.id == array[j]?.productId) {
        products.push(productsAll[i]);
      }
    }
  }
  console.log(products, "products");
  console.log(array, "array");

  return (
    <div className={style.content}>
      {products.map((element) => {
        return (
          <div className={style.contentCard}>
            <img src={element.mainImage} alt="imagen de el peroducto" />
            <h3>{element.name}</h3>
          </div>
        );
      })}
      {array.length < 1 || Object.entries(user).length === 0 ? null : (
        <NavLink to={`/user/${user.id}`} className={style.viewAll}>
          Mostrar todos
        </NavLink>
      )}
    </div>
  );
}
