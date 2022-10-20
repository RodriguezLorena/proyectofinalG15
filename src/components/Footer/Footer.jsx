import React from "react";
import style from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={style.container}>
      <ul className={style.ul}>
        <li className={style.li}>
          <FaFacebook size="25" />
        </li>
        <li className={style.li}>
          <FaInstagram size="25" />
        </li>
        <li className={style.li}>
          <FaLinkedin size="25" />
        </li>
      </ul>
      <div className={style.input}>
        <label className={style.label}>
          Tu opinion nos ayuda
          <input type="text" placeholder="Dejanos tu Comentario" />
        </label>
        <span>Proyecto Final g14-©Todos los derechos reservados </span>
      </div>
    </div>
  );
};

export default Footer;
