import React from "react";
import style from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo from "../../img/logoVelvet.png"

const Footer = () => {
  return (
    <div>
    <div className={style.container}>
      <ul className={style.ul}> 
        <li className={style.li}>
          <FaFacebook size="30" color="#ed8dc0" />
        </li>
        <li className={style.li}>
          <FaInstagram size="30" color="#ed8dc0"/>
        </li>
        <li className={style.li}>
          <FaLinkedin size="30" color="#ed8dc0" />
        </li>
      </ul>
      <div>
      <img src={Logo} alt="Logo" width="300" height="300"/>
      </div>
      <div className={style.input}>
        <label className={style.label}>
          Tu opinion nos ayuda
          <textarea className={style.textArea} type="textarea" placeholder="Dejanos tu Comentario"/>
        </label>  
      </div>
     
     
      
      
    </div>
    <div className={style.span}><span>Proyecto Final g14-©Todos los derechos reservados </span></div>
    
    </div>
  );
};

export default Footer;
