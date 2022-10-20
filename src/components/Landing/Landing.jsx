import React from "react";
import Card from "../Card/Card";
import Navbar from "../Home/Navbar/Navbar";
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
        <Navbar />

        <div className={style.carrusel}>
          <ul>
            <li>
              <img
                src="https://carruselmoda.com/wp-content/uploads/2022/06/Carrusel-moda-envios-gratis-ropa.jpg"
                alt=""
              />
            </li>
            <li>
              <img
                src="https://cdn.shopify.com/s/files/1/0273/7884/3785/articles/que-ropa-favorece-segun-cuerpo_1600x.jpg?v=1599819540"
                alt=""
              />
            </li>
            <li>
              <img
                src="https://media.meer.com/attachments/d3375ae9e0beb2d7b550a04fe6ae2d2d5aadc69d/store/fill/1090/613/5b50f51699c787b0a66dd3c24259c59233be4fe27405b44d9678bac58b9f/Todo-un-armario-del-que-tomar-prestada-la-ropa.jpg"
                alt=""
              />
            </li>
          </ul>
        </div>

        <div className={style.contentCarrousel}>
          <div className="h-56  sm:h-1/2  xl:h-screen  w-full mt-20 2xl:h-96">
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
              <div className="flex">
                {productsBuy &&
                  productsBuy.slice(0, 3).map((element, i) => {
                    return (
                      <div className="flex items-center  h-full w-max  px-10">
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

          <div className="h-56  sm:h-1/2  xl:h-screen mb-0 w-full  2xl:h-96">
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
              <div className="flex">
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
                  <h4>Varios</h4>
                  <img
                    src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burro-ropa-armario-abierto-westwing-almacenaje-y-orden-armario-1633514060.jpg?crop=1.00xw:0.834xh;0,0.0534xh&resize=480:*"
                    alt=""
                  />
                </div>
              </div>
            </Carousel>
          </div>
        </div>

        <div className="h-56  sm:h-1/2  xl:h-96 mb-0 w-full  2xl:h-96">
          <h4 className={style.titleGalery}>Tus marcas favoritas estan aqui</h4>
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

        <NavLink to="/home" className={style.boton}>
          View all
        </NavLink>
      </div>
      <Footer />
    </div>
  );
}
