import React from "react";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import style from "./Landing.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/action";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Carousel } from "flowbite-react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Landing() {
  const dispatch = useDispatch();
  const productsAll = useSelector((state) => state.productsAll);
  const productsBuy = productsAll.filter(
    (element) => element.bestSellers === true
  );
  const productsCategotyWoman = productsAll.filter(
    (element) => element.category == "mujer"
  );
  const productsCategotyMan = productsAll.filter(
    (element) => element.category == "hombre"
  );
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <div className={style.content}>
        <NavBar />
        <div className={style.carrusel}>
          <ul>
            <li>
              <img
                src="https://www.bezzia.com/wp-content/uploads/2021/01/prendas-pata-gallo.jpg.webp"
                alt=""
              />
            </li>
            <li>
              <img
                src="https://www.bezzia.com/wp-content/uploads/2021/12/un-estampado-varios-colores.jpg"
                alt=""
              />
            </li>
            <li>
              <img
                src="https://www.moncloa.com/wp-content/uploads/2020/12/Zapatos-de-piel-para-hombre-y-mujer-por-menos-de-30-euros-hoy-en-Aliexpress.jpg"
                alt=""
              />
            </li>
          </ul>
        </div>

        <div className={style.contentCarrousel}>
          <div className="h-screen  sm:h-screen  xl:h-screen  w-full mt-0  2xl:h-screen">
            <h3 className={style.titleCarrusel}>Productos mas vendidos</h3>
            <Carousel
              leftControl={
                <IoIosArrowBack size="40px" className={style.butonsCarrosuel} />
              }
              rightControl={
                <IoIosArrowForward
                  size="40px"
                  className={style.butonsCarrosuel}
                />
              }
            >
              <div className="flex ">
                {productsBuy &&
                  productsBuy.slice(0, 3).map((element, i) => {
                    return (
                      <div className="flex items-center justify-center  h-full w-full  px-10">
                        <Card
                          name={element.name}
                          image={element.images[0].img}
                          price={element.price}
                          id={element.id}
                          key={element.id}
                        />
                      </div>
                    );
                  })}
              </div>
              <div className="flex">
                {productsBuy &&
                  productsBuy.slice(3, 6).map((element, i) => {
                    return (
                      <div className="flex items-center justify-center  h-full w-full px-10">
                        <Card
                          name={element.name}
                          image={element.images[0].img}
                          price={element.price}
                          id={element.id}
                          key={element.id}
                        />
                      </div>
                    );
                  })}
              </div>
              <div className="flex">
                {productsBuy &&
                  productsBuy.slice(6, 9).map((element, i) => {
                    return (
                      <div className="flex items-center justify-center h-full w-full px-10">
                        <Card
                          name={element.name}
                          image={element.images[0].img}
                          price={element.price}
                          id={element.id}
                          key={element.id}
                        />
                      </div>
                    );
                  })}
              </div>
            </Carousel>
          </div>

          <div className="h-96 w-full  sm:h-96  w-full xl:h-96  w-full  2xl:h-96">
            <h3 className={style.titleCarrusel}>Categorias</h3>
            <Carousel
              leftControl={
                <IoIosArrowBack size="40px" className={style.butonsCarrosuel} />
              }
              rightControl={
                <IoIosArrowForward
                  size="40px"
                  className={style.butonsCarrosuel}
                />
              }
            >
              <div className="flex items-center justify-center">
                <div className={style.card}>
                  <h4>Hombre</h4>
                  <img
                    src="https://thumbs.dreamstime.com/b/hombre-joven-hermoso-modelo-de-moda-en-la-ropa-sport-elegante-que-mira-c%C3%A1mara-sobre-fondo-gris-154379876.jpg"
                    alt=""
                  />
                </div>
                <div className={style.card}>
                  <h4>Mujer</h4>
                  <img
                    src="https://st3.depositphotos.com/1441511/13049/i/450/depositphotos_130492510-stock-photo-fashion-model-style-fashionable-woman.jpg"
                    alt=""
                  />
                </div>
                <div className={style.card}>
                  <h4>Niños</h4>
                  <img
                    src="https://childrens-spaces.com/wp-content/uploads/2019/02/moda-infantil-4.jpg"
                    alt=""
                  />
                </div>
                <div className={style.card}>
                  <h4>Varios</h4>
                  <img
                    src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burro-ropa-armario-abierto-westwing-almacenaje-y-orden-armario-1633514060.jpg?crop=1.00xw:0.834xh;0,0.0534xh&resize=480:*"
                    alt=""
                  />
                </div>
              </div>
            </Carousel>
          </div>

          <div className="h-96 w-full sm:h-96 w-full xl:h-96 mb-0 w-full  2xl:h-96 w-full">
            <h4 className={style.titleGalery}>Tus marcas favoritas</h4>
            <Carousel
              leftControl={
                <IoIosArrowBack size="40px" className={style.butonsCarrosuel} />
              }
              rightControl={
                <IoIosArrowForward
                  size="40px"
                  className={style.butonsCarrosuel}
                />
              }
            >
              <div className={style.contentGalery}>
                <div className={style.galleryContent}>
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/5188263be4b0b44af63109d8/1547527530533-9G8VMVFOZAUCS2G5LK11/nike-logo-square.png"
                    alt=""
                    className={style.marcas}
                  />
                  <div className={style.contentFondo}></div>
                </div>
                <div className={style.galleryContent}>
                  <img
                    className={style.marcas}
                    src="https://i.pinimg.com/474x/4d/3b/a4/4d3ba43ddac94977dc7d28663a566f69.jpg"
                    alt=""
                  />

                  <div className={style.contentFondo}></div>
                </div>
                <div className={style.galleryContent}>
                  <img
                    src="https://i.pinimg.com/originals/c0/8b/bb/c08bbbd32ac78859882278ffdf236e89.jpg"
                    alt=""
                    className={style.marcas}
                  />
                  <div className={style.contentFondo}></div>
                </div>
                <div className={style.galleryContent}>
                  <img
                    src="https://i.pinimg.com/originals/b9/2a/d8/b92ad82c88edc9690a7a2268fa5e3acd.png"
                    alt=""
                    className={style.marcas}
                  />
                  <div className={style.contentFondo}></div>
                </div>
              </div>
              <div className={style.contentGalery}>
                <div className={style.galleryContent}>
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/5188263be4b0b44af63109d8/1547527530533-9G8VMVFOZAUCS2G5LK11/nike-logo-square.png"
                    alt=""
                    className={style.marcas}
                  />
                  <div className={style.contentFondo}></div>
                </div>
                <div className={style.galleryContent}>
                  <img
                    className={style.marcas}
                    src="https://i.pinimg.com/474x/4d/3b/a4/4d3ba43ddac94977dc7d28663a566f69.jpg"
                    alt=""
                  />

                  <div className={style.contentFondo}></div>
                </div>
                <div className={style.galleryContent}>
                  <img
                    src="https://i.pinimg.com/originals/c0/8b/bb/c08bbbd32ac78859882278ffdf236e89.jpg"
                    alt=""
                    className={style.marcas}
                  />
                  <div className={style.contentFondo}></div>
                </div>
                <div className={style.galleryContent}>
                  <img
                    src="https://i.pinimg.com/originals/b9/2a/d8/b92ad82c88edc9690a7a2268fa5e3acd.png"
                    alt=""
                    className={style.marcas}
                  />
                  <div className={style.contentFondo}></div>
                </div>
              </div>
            </Carousel>
          </div>
        </div>

        <NavLink to="/home" className={style.boton}>
          Ver todos los productos
        </NavLink>
      </div>
      <Footer />
    </div>
  );
}
