import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/action";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar/Navbar";

export default function Home() {
  const dispatch = useDispatch();
  const productsAll = useSelector((state) => state.productsAll);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return <div>
    <Navbar/>
    <Footer/>
  </div>;
}
