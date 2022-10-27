import React from "react";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";

const sidebar = () => {
  return (
    <div>
      <NavBar />
      <ul>
        <li>
          <Link to="">Inicio</Link>
        </li>
        <li>
          <Link to="">Ventas</Link>
        </li>
        <li>
          <Link to="">Clientes</Link>
        </li>
      </ul>
    </div>
  );
};

export default sidebar;
