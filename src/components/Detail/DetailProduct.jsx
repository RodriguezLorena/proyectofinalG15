import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GetDetail } from "../../redux/action";
import Navbar from "../Home/Navbar/Navbar";

import style from "../Detail/Detail.module.css";
import Footer from "../Footer/Footer";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const IdProduct = useSelector((state) => state.detailProduct);
  const [state, setState] = useState(true);

  useEffect(() => {
    dispatch(GetDetail(id)).then(() => setState(false));
  }, [dispatch, id]);

  if (state) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={style.container_detail}>
      <Navbar />
      <div>
        {
          <div className={style.container}>
            <div className={style.img_detail}>
              <img
                src={IdProduct[0].image}
                alt="img no fount"
                height="300px"
                width="300px"
              />
            </div>
            <div className={style.text_detail}>
              <h3>Id: {IdProduct[0].id}</h3>
              <h3>Name: {IdProduct[0].name}</h3>

              <h3>Stock: {IdProduct[0].stock}</h3>
              <h3>Description: {IdProduct[0].description}</h3>
              <h3>Value: {IdProduct[0].value}</h3>
              <h3>Category: {IdProduct[0].category}</h3>
            </div>
          </div>
        }
      </div>

      <div className={style.price_detail}>
        <strong>
          <h3>$ {IdProduct[0].price}</h3>
        </strong>
      </div>
      <div className="button_compra1">
        <button>Buy now</button>
      </div>
      <Footer />
    </div>
  );
}
