import React from "react";
import NavBar from "../NavBar/NavBar";
import { NavLink } from "react-router-dom";
import style from "./Sidebar.module.css";

const sidebar = () => {
  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center h-screen ">
        <NavLink to="/formulario" className={style.butons}>
          Crear Producto
        </NavLink>
        <NavLink to="" className={style.butons}>
          Clientes
        </NavLink>
      </div>
    </div>
  );
};

export default sidebar;
