import axios from 'axios'
//import cookieParser from 'cookie-parser'
import React, { useState } from 'react'

 function SubirImg  (childToparent) {
    const [imagen, setImagen]= useState("")
    const [loading, setLoading]= useState(false)

    const subirImgen = async(e)=>{
        const files= e.target.files;
        const data= new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "velvet");
        setLoading(true)

        const res= await fetch("https://api.cloudinary.com/v1_1/velvetpf/image/upload", {
            method: "POST",
            body:data,

        })

        const file= await res.json();
      childToparent.childToParent(file.secure_url)
        setImagen(file.secure_url)
        console.log("ACA ESTA ", file.secure_url)
        setLoading(false)
    
    }
  return (
    <div>
        <label>
            Subir Imagen
            <input type="file" name= "file" placeholder='Suba un imagen' onChange={subirImgen}/>
            <button> upload...</button>
            {loading ? (<h3>Cargando...</h3>):(<img src={imagen} alt="img" style={{width:"50px"}}/>)}
        </label>
       
    </div>
  )
}

export default SubirImg