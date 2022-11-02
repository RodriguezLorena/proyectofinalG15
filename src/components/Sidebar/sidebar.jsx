import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { NavLink } from "react-router-dom";
import style from "./Sidebar.module.css";
import {
  getUser,
  putUser,
  searchUserLocal,
  putProduct,
  getForName,
  getProducts,
} from "../../redux/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//import { findRenderedComponentWithType } from "react-dom/test-utils";
// import { FiMinusCircle } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

const Sidebar = () => {
  const dispach = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const allProducts = useSelector((state) => state.productsAll);

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function handelBan(id) {
    dispatch(putUser(id, { role: "inactive" }));
  }

  function searchUser(e) {
    e.preventDefault();
    dispatch(searchUserLocal(search));
    setSearch("");
  }

  function searchProducts(e) {
    e.preventDefault();
    dispach(getForName(search));
    setSearch("");
  }

  function handelSearch(e) {
    setSearch(e.target.value);
  }
  function recargar() {
    dispatch(getUser(user.token));
    dispatch(getProducts());
  }

  useEffect(() => {
    dispatch(getUser(user.token));
    dispatch(getProducts());
  }, [dispatch]);

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  function handelBan(id) {
    dispach(putProduct({ value: false }, id));
  }

  return (
    <div className="bg-white">
      <NavBar />
      <div className={style.content}>
        <div className="w-full">
          <NavLink to="/formulario" className={style.butons}>
            Crear Producto
          </NavLink>
        </div>
        <div className={style.tabs}>
          <ul>
            <li
              onClick={() => {
                toggleTab(1);
                recargar();
              }}
            >
              Lista de usuarios
            </li>
            <li
              onClick={() => {
                toggleTab(2);
                recargar();
              }}
            >
              Listas de productos
            </li>
          </ul>
        </div>

        <div
          className={
            toggleState === 1 ? style.contentsInfo : style.contentsInfoNo
          }
        >
          <h5>Lista de usuarios</h5>
          <form
            action=""
            onSubmit={(e) => searchUser(e)}
            className={style.search}
          >
            <input
              type="text"
              placeholder="Buscar por nombre de usuario..."
              value={search}
              onChange={(e) => handelSearch(e)}
              className={style.inputSearch}
            />

            <button type="submit" name="serach" className=" h-10">
              <FiSearch size="30" />
            </button>
          </form>
          {users &&
            users.map((element) => {
              return (
                <div className={style.contentUsers}>
                  <p>
                    <b>Nombre de usuario:</b> {element.userName}
                  </p>
                  <p>
                    <b>Id:</b> {element.id}
                  </p>
                  <p>
                    <b>Email:</b> {element.email}
                  </p>
                  <p>
                    <b>Estado:</b> {element.role}
                  </p>
                  <button onClick={() => handelBan(element.id)}>Banear</button>
                </div>
              );
            })}
        </div>
        <div
          className={
            toggleState === 2 ? style.contentsInfo : style.contentsInfoNo
          }
        >
          <h5>Lista de productos</h5>

          <form
            action=""
            onSubmit={(e) => searchProducts(e)}
            className={style.search}
          >
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => handelSearch(e)}
              className={style.inputSearch}
            />

            <button type="submit" name="serach" className=" h-10">
              <FiSearch size="30" />
            </button>
          </form>
          {allProducts &&
            allProducts.map((element) => {
              return (
                <div className={style.contentProducts}>
                  <p>
                    <b>Nombre de producto:</b> {element.name}
                  </p>
                  <p>
                    <b>Imagen:</b>
                    <img src={element.mainImage} alt="" />
                  </p>
                  <p>
                    <b>Id:</b> {element.id}
                  </p>
                  <NavLink
                    // className="bg-red-700 text-white  py-2 px-2 rounded-3xl rounded-3xl"
                    onClick={() => handelBan(element.id)}
                    className={style.butonsCards}
                  >
                    Deshabilitar
                  </NavLink>

                  <NavLink
                    to={`/editproduct/${element.id}`}
                    // className="bg-red-700 text-white py-2 px-2 rounded-3xl rounded-3xl"
                    className={style.butonsCards}
                  >
                    Editar
                  </NavLink>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
