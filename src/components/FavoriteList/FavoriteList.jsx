import React from "react";
import style from "./FavoriteList.modeule.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeOneProduct, removeAll } from "../../redux/action";
import swal from "sweetalert";
import FavoriteCart from "../FavoriteCard/FavoriteCart";

export default function CartList() {
  const cartState = useSelector((state) => state.cart);
  const total = useSelector((state) => state.cartTotal);
  const user = useSelector((state) => state.user);
  const dispach = useDispatch();

  const deleteCart = (id, todos = false) => {
    if (todos) {
      dispach(removeAll(id));
      swal("todos los productos eliminados");
    } else {
      dispach(removeOneProduct(id));
      swal({
        title: "Producto eliminado correctamente",
        icon: "success",
        className: "swal-title",
        className: "swal-modal",
      });
    }
  };

  return (
    <div className={style.favoriteList}>
      <FavoriteCart />
      <FavoriteCart />
      <div className={style.contentAll}>
        <NavLink to={`/user/${user.id}`} className={style.viewAll}>
          Mostrar todos
        </NavLink>
      </div>
    </div>
  );
}
