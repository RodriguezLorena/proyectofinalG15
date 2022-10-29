import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Dropdown } from "flowbite-react";
import style from "./NavBar.module.css";
import CartList from "../CartList/CartList";
import Logo from "../../img/logoVelvet.png";
import { getForName, login, creatAcount, clearUser } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Modal, Label, TextInput, Checkbox } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import { BsArrowLeftShort } from "react-icons/bs";
import Admin from "../Admin/Admin";

export default function NavBar({ home, products }) {
  const dispatch = useDispatch();
  const navegation = useNavigate();
  const [search, setSearch] = useState("");
  const cantidadCarrito = useSelector((state) => state.cartTotalItems);
  const user = useSelector((state) => state.user);

  function handelSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function searchForName(e) {
    e.preventDefault();
    dispatch(getForName(search));
    setSearch("");
  }

  //---------Login-------//

  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [valuesInputs, setValuesInputs] = useState({
    userName: "",
    password: "",
  });
  const [valuesCreate, setValuesCreate] = useState({
    email: "",
    password: "",
    userName: "",
  });
  // const [admin, setAdmin] = useState({ email: "", password : "" });

  function handelChangue(e) {
    e.preventDefault();
    setValuesInputs({ ...valuesInputs, [e.target.name]: e.target.value });
  }

  function handelChangueCreate(e) {
    e.preventDefault();
    setValuesCreate({ ...valuesCreate, [e.target.name]: e.target.value });
  }

  function handelLogin(e) {
    e.preventDefault();
    dispatch(login(valuesInputs));
  }
  function handelCreateacount(e) {
    e.preventDefault();
    dispatch(creatAcount(valuesCreate));
    setValuesCreate({
      email: "",
      password: "",
      userName: "",
    });
  }

  function handelClearUser(e) {
    e.preventDefault();
    dispatch(clearUser());
    navegation("/");
  }

  //-------------------//

  return (
    <div>
      {user.role == "admin" ? <Admin /> : null}

      <div className={style.content}>
        <div className={style.contentNavegation}>
          <ul>
            <li className={home == true ? style.botonHover : style.boton}>
              <NavLink to="/">Inicio</NavLink>
            </li>
            <li className={products == true ? style.botonHover : style.boton}>
              <NavLink to="/home">Todos los productos</NavLink>
            </li>
          </ul>
        </div>
        <NavLink to="/">
          <img
            src={Logo}
            alt="logo"
            width="130"
            height="130"
            className={style.logo}
          />
        </NavLink>

        <div className={style.contentIcons}>
          <React.Fragment>
            {Object.entries(user).length < 1 ? (
              <button
                onClick={() => {
                  setShowModal(true);
                  setValuesInputs({ userName: "", password: "" });
                }}
              >
                <IoPersonOutline className="mr-10" size="30" />
              </button>
            ) : (
              <div className="flex flex-col justify-center items-center  mr-10 mt-2">
                <Dropdown
                  label={<IoPersonOutline size="30" />}
                  inline={true}
                  arrowIcon={false}
                >
                  <Dropdown.Item>
                    <NavLink
                      to={`/user/${user.id}`}
                      className="flex colum justify-center flex-col items-center"
                    >
                      perfil
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={(e) => handelClearUser(e)}>
                    Cerrar sesion
                  </Dropdown.Item>
                </Dropdown>
                <h5>{user.userName}</h5>
              </div>
            )}

            <Modal show={showModal} size="md" popup={true}>
              <div className="p-5 text-right ">
                <button
                  onClick={() => setShowModal(false)}
                  className="  rounded"
                >
                  <IoClose size="30" />
                </button>
              </div>
              <Modal.Body>
                <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 ">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white bb">
                    Iniciar sesion
                  </h3>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="userName" value="Usuario" />
                    </div>
                    <TextInput
                      id="userName"
                      placeholder="Usuario"
                      required={true}
                      onChange={(e) => handelChangue(e)}
                      name="userName"
                      value={valuesInputs.userName}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="password" value="Contraseña" />
                    </div>
                    <TextInput
                      id="password"
                      type="password"
                      required={true}
                      onChange={(e) => handelChangue(e)}
                      name="password"
                      value={valuesInputs.password}
                    />
                  </div>

                  <div className="w-full  text-center">
                    <button
                      onClick={(e) => {
                        // setAdmin(valuesInputs);
                        setShowModal(false);
                        handelLogin(e);
                      }}
                      className="bg-blue-700 text-white p-2 rounded-3xl text-xl "
                    >
                      Iniciar sesion
                    </button>
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    No tienes una cuenta?{" "}
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setShowCreate(true);
                      }}
                      className="text-blue-700 hover:underline dark:text-blue-500"
                    >
                      Crear cuenta
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </React.Fragment>

          {/* -------------------------------------------- */}
          <React.Fragment>
            <Modal show={showCreate} size="md" popup={true}>
              <div className="p-5 flex align-center justify-between ">
                <button
                  onClick={() => {
                    setShowCreate(false);
                    setShowModal(true);
                  }}
                >
                  <BsArrowLeftShort size="30" />
                </button>
                <button
                  onClick={() => setShowCreate(false)}
                  className="rounded"
                >
                  <IoClose size="30" />
                </button>
              </div>
              <Modal.Body>
                <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 ">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Create acount
                  </h3>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="userName" value="Nombre de usuario" />
                    </div>
                    <TextInput
                      id="userName"
                      placeholder="Usuario"
                      required={true}
                      onChange={(e) => handelChangueCreate(e)}
                      name="userName"
                      value={valuesCreate.userName}
                    />

                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput
                      id="email"
                      placeholder="name@company.com"
                      required={true}
                      onChange={(e) => handelChangueCreate(e)}
                      name="email"
                      value={valuesCreate.email}
                    />
                    <div className="mb-2 block">
                      <Label htmlFor="password" value="Constrseña" />
                    </div>
                    <TextInput
                      id="password"
                      type="password"
                      placeholder="Contraseña"
                      required={true}
                      onChange={(e) => handelChangueCreate(e)}
                      name="password"
                      value={valuesCreate.password}
                    />
                  </div>

                  <div className="w-full text-center">
                    <button
                      onClick={(e) => {
                        // setAdmin(valuesInputs);
                        setShowCreate(false);
                        handelCreateacount(e);
                      }}
                      className="bg-blue-700 text-white p-2 rounded-3xl text-xl "
                    >
                      Crear cuenta
                    </button>
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setShowCreate(true);
                      }}
                      className="text-blue-700 hover:underline dark:text-blue-500"
                    ></button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </React.Fragment>
          {/* -------------------------------------------- */}

          <div className={style.carrito}>
            <span className={style.contador}>{cantidadCarrito}</span>
            <Dropdown
              label={<MdOutlineShoppingCart size="30" />}
              inline={true}
              arrowIcon={false}
            >
              <Dropdown.Item>
                <CartList />
              </Dropdown.Item>
            </Dropdown>
          </div>

          <form action="" onSubmit={(e) => searchForName(e)}>
            <NavLink to="/home">
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => handelSearch(e)}
                className={style.inputSearch}
              />
            </NavLink>
            <button type="submit" name="serach" className=" h-10">
              <FiSearch size="30" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
