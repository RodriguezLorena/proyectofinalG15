import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/action";
import Layout from "./Layout/Layout";

export default function Home() {
  const dispatch = useDispatch();
  const productsAll = useSelector((state) => state.productsAll);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return <Layout></Layout>;
}
