import React from "react";
import style from "./Card.module.css";
import { NavLink } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { addToCart } from "../../redux/action";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

export default function Card({ name, image, price, id, sizes, categories}) {
  const dispach = useDispatch();

  const addCart = (id) => {
    console.log(id);
    dispach(addToCart(id));
    swal({
      title: "Producto agregado al carrito",
      icon: "success",
      button: "Aceptar",
      className: "swal-modal",
      className: "swal-overlay",
      className: "swal-title",
    });
  };

  return (
    <div className={style.content}>
      <MdOutlineShoppingCart
        className={style.carrito}
        size="40px"
        onClick={() => addCart(id)}
      />
      <NavLink to={`/product/${id}`} className={style.link}>
        <img
          src={
            image ||
            "https://static.wikia.nocookie.net/ben10/images/a/a2/Sinimagen.png/revision/latest?cb=20170610100405&path-prefix=es"
          }
          alt=""
          className={style.fondo}
        />
      </NavLink>
      <div className={style.contentInfo}>
        <div className={style.fondoRotado}></div>
        <div className={style.contnetMeGusta}>
          <AiFillHeart className={style.meGusta} size="30px" />
        </div>
        <NavLink to={`/product/${id}`} className={style.link}>
          <h5>{name}</h5>
          <div className={style.talasPrecio}>
            <div className={style.tallas}>
              {sizes.map((e) =>{
              return(<p key={e}>{e}</p>)})}
            </div>
            <h6>${price}</h6>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
