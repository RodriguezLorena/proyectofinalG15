import { Navbar } from "flowbite-react";
import React, { useEffect } from "react";
import {useState} from "react"
import { Link } from "react-router-dom";
import style from "./Pagos.module.css";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import BotonMercadopago from './BotonMercadopago'
import axios from "axios";
const parse = require('html-react-parser');
const Pagos = () => {
 const [pagar,setPagar]= useState(true)
  const cartState = useSelector((state) => state.cart);
  const total = useSelector((state) => state.cartTotal);
  const [preferenceId, setPreferenceId] = useState(null);
  //const [prueba,setPrueba] =useState(null)
  //console.log(cartState[0],"aaaaaaaaa",total)
  const orderData = {
    title: cartState[0].name,
    stock: cartState[0].cantidad,
    price: cartState[0].price
  };
//   useEffect(()=>
//   {
//     async function render() {
//       const Render = await axios.get(`http://localhost:3001/prueba?=${preferenceId}`)
//       console.log(Render.data)

//      setPrueba(Render.data)
// }
//   render();
//   },[preferenceId])
      // async function render() {
      //   const Render = await axios.get(`http://localhost:3001/prueba?=${preferenceId}`)
        
      //   return Render.data
      //   }
  async function handlePay(e) {

    e.preventDefault()
    const preference = await axios.post(`http://localhost:3001/payment`, orderData)

    //console.log(preference.data, 'este es el body');
    setPreferenceId(preference.data)
    setPagar(!pagar)
    // var script = document.createElement("script");
  
    // // The source domain must be completed according to the site for which you are integrating.
    // // For example: for Argentina ".com.ar" or for Brazil ".com.br".
    // script.src = "https://sdk.mercadopago.com/js/v2";
    // script.type = "text/javascript";
    // script.dataset.preferenceId = preferenceId;
    // document.getElementById("page-content").innerHTML = "";
    // document.querySelector("#page-content").appendChild(script);
    }
  return (
    <div>
      <NavBar />
      <div className={style.content}>
        <h1>Velvet, PAGOS!</h1>
   
          {pagar?
        <form className={style.tagFrom}>
          <label>Nombre:</label>
          <input type="text" name="nombre" autoComplete="off" value="" />
          <label>Apellido:</label>
          <input type="text" name="nombre" autoComplete="off" value="" />
          <label>E-mail:</label>
          <input type="text" name="email" autoComplete="off" value="" />
          
            <button >Solicitar pago</button>
            <button onClick={handlePay} orderData={orderData}>pagareee</button>
         <button onClick={handlePay} orderData={orderData}>Pagaraaaa</button></form>:
         <a href={`http://localhost:3001/prueba?preference=`+preferenceId}>Link</a>
         }
         
        
        
      </div>
    </div>
  );
};

export default Pagos;
