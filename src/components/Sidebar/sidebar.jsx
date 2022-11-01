import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { NavLink } from "react-router-dom";
import style from "./Sidebar.module.css";
import { getUser, putUser, searchUserLocal } from "../../redux/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { findRenderedComponentWithType } from "react-dom/test-utils";
import { FiMinusCircle } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function handelBan(id) {
    dispatch(putUser(id, { role: "inactive" }));
  }

  function searchUser(e) {
    e.preventDefault();
    dispatch(searchUserLocal(search));
  }

  function handelSearch(e) {
    setSearch(e.target.value);
  }
  console.log(user.token);
  useEffect(() => {
    console.log("enviooo");
    dispatch(getUser(user.token));
  }, [dispatch]);

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

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
            <li onClick={() => toggleTab(1)}>Lista de usuarios</li>
            <li onClick={() => toggleTab(2)}>Listas de compras</li>
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
          <h5>Lista de compras</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            quo adipisci sequi vel modi pariatur? Modi, quam quidem dicta, quis
            hic dolorem eos, aut perspiciatis rem nulla harum numquam ea.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
