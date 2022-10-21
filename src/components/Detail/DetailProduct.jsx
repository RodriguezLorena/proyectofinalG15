import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GetDetail } from "../../redux/action";
import style from "../Detail/Detail.module.css";
import Footer from "../Footer/Footer";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import Card from "../Card/Card";
import { Carousel } from "flowbite-react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import NavBar from "../NavBar/NavBar";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const IdProduct = useSelector((state) => state.detailProduct);
  const productsAll = useSelector((state) => state.productsAll);

  const filterForCategory = productsAll.filter(
    (element) => element.category == IdProduct[0].category
  );

  const [state, setState] = useState(true);

  useEffect(() => {
    dispatch(GetDetail(id)).then(() => setState(false));
  }, [dispatch, id]);

  if (state) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={style.content}>
      <NavBar />
      <div className={style.contentDetail}>
        <div className={style.contentImages}>
          <div className={style.images}>
            <button>
              <img src={IdProduct[0].images[0].img} alt="img no fount" />
            </button>
            <button>
              <img src={IdProduct[0].images[0].img} alt="img no fount" />
            </button>
            <button>
              <img src={IdProduct[0].images[0].img} alt="img no fount" />
            </button>
            <button>
              <img src={IdProduct[0].images[0].img} alt="img no fount" />
            </button>
          </div>
          <img
            src={IdProduct[0].images[0].img}
            alt="img no fount"
            className={style.imageP}
          />
        </div>

        <div className={style.textContent}>
          <div className={style.contentLike}>
            <AiOutlineHeart className={style.like} size="30px" />
          </div>
          <h2 className={style.title}> {IdProduct[0].name}</h2>
          <span className={style.price}> ${IdProduct[0].price}</span>
          <h3 className={style.stock}>Stock: {IdProduct[0].stock}</h3>
          <h3 className={style.description}>{IdProduct[0].description}</h3>
          <h3>
            <b>Category:</b> {IdProduct[0].category}
          </h3>
          <div className={style.buyCarrito}>
            <button className={style.buy}>Comparar ya</button>
            <MdOutlineShoppingCart className={style.carrito} size="40px" />
          </div>
        </div>
      </div>

      <div className={style.contentRealciones}>
        <div className="h-56  sm:h-1/2  xl:h-screen  w-full mt-20 2xl:h-96">
          <h3 className={style.titleCarrusel}>Productos Relacionados</h3>
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
              {filterForCategory &&
                filterForCategory.slice(0, 3).map((element, i) => {
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
              {filterForCategory &&
                filterForCategory.slice(3, 6).map((element, i) => {
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
              {filterForCategory &&
                filterForCategory.slice(6, 9).map((element, i) => {
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
        {/* {filterForCategory &&
          filterForCategory.map((element) => {
            return (
              <Card
                name={element.name}
                image={element.images[0].img}
                price={element.price}
                id={element.id}
                key={element.id}
              />
            );
          })} */}
      </div>
      <Footer />
    </div>
  );
}
