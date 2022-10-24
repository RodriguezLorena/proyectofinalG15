import { Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import style from "./Pagos.module.css";
import NavBar from "../NavBar/NavBar";

const Pagos = () => {
  return (
    <div>
      <NavBar />
      <div className={style.content}>
        <h1>Velvet, PAGOS!</h1>
        <form className={style.tagFrom}>
          <label>Nombre:</label>
          <input type="text" name="nombre" autoComplete="off" value="" />
          <label>Apellido:</label>
          <input type="text" name="nombre" autoComplete="off" value="" />
          <label>E-mail:</label>
          <input type="text" name="email" autoComplete="off" value="" />
          <label>Tarjeta:</label>
          <input
            type="text"
            name="tajeta"
            placeholder="Coloque el tipo de tarjeta"
            value=""
          />
          <label>Codigo:</label>
          <input
            type="text"
            name="tajeta"
            placeholder="Coloque el codigos"
            value=""
          />
          <Link to="/home">
            <button>PAGAR</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Pagos;
