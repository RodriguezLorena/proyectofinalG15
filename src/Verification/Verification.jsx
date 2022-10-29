import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Verify } from "../redux/action";
export default function Verifico (){
 
const [numero,setNumero]= useState("")
 let params = useParams()
 let id= params.id
const dispatch= useDispatch()
        
function handleBoton(){
   
  const a= { random: numero}
        
        
      
  return dispatch(Verify(id,a))
       
      
}
function Cambio(e){
    
  return  setNumero(e)
}

return(
<div>

<h1>Hola aca se verifica el mail</h1>
<input type="text" name="texto" value={numero} onChange={e=>Cambio(e.target.value)}></input>
<label></label>

<button onClick={()=>handleBoton()}> OK</button>
</div>
)
}