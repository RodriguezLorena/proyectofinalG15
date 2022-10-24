import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Dropdown } from "flowbite-react";
import style from "./NavBar.module.css";
import CartList from "../CartList/CartList";
import Logo from "../../img/logoVelvet.png";
import { getForName } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Modal, Label, TextInput, Checkbox } from "flowbite-react";

export default function NavBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const cantidadCarrito = useSelector((state) => state.cartTotalItems);

  function handelSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function searchForName(e) {
    e.preventDefault();
    dispatch(getForName(search));
    setSearch("");
  }

  const [showModal, setShowModal] = useState(false);
  const [valuesInputs, setValuesInputs] = useState({ email: "", pasword: "" });
  const [admin, setAdmin] = useState({ email: "", pasword: "" });

  function handelChangue(e) {
    e.preventDefault();
    setValuesInputs({ ...valuesInputs, [e.target.name]: e.target.value });
  }

  return (
    <div className={style.content}>
      <NavLink to="/">
        <img src={Logo} alt="logo" width="130" height="130" />
      </NavLink>
      <form action="" onSubmit={(e) => searchForName(e)}>
        <NavLink to="/home">
          <input
            type="text"
            placeholder="Buscar Producto..."
            value={search}
            onChange={(e) => handelSearch(e)}
            className={style.inputSearch}
          />
        </NavLink>
        <button type="submit" name="serach" className=" h-10">
          <FaSearch size="20" />
        </button>
      </form>

      <div className={style.contentIcons}>
        <NavLink
          to="/formulario"
          className={
            admin.email == "correakevinfabian01@gmail.com" &&
            admin.pasword == "0101"
              ? style.createProduct
              : style.createProductOcult
          }
        >
          Crear Producto
        </NavLink>

        <React.Fragment>
          <button
            onClick={() => {
              setShowModal(true);
              setValuesInputs({ email: "", pasword: "" });
            }}
          >
            <IoPersonOutline className="mr-10" size="30" />
          </button>

          <Modal show={showModal} size="md" popup={true}>
            <div className="p-5 text-right ">
              <button
                onClick={() => setShowModal(false)}
                className="bg-slate-200 p-1 rounded"
              >
                X
              </button>
            </div>
            <Modal.Body>
              <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 ">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Sign in to our platform
                </h3>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Your email" />
                  </div>
                  <TextInput
                    id="email"
                    placeholder="name@company.com"
                    required={true}
                    onChange={(e) => handelChangue(e)}
                    name="email"
                    value={valuesInputs.email}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password" value="Your password" />
                  </div>
                  <TextInput
                    id="password"
                    type="password"
                    required={true}
                    onChange={(e) => handelChangue(e)}
                    name="pasword"
                    value={valuesInputs.pasword}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                  </div>
                  <a
                    href="/modal"
                    className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Lost Password?
                  </a>
                </div>
                <div className="w-full">
                  <Button
                    onClick={() => {
                      setAdmin(valuesInputs);
                      setShowModal(false);
                    }}
                  >
                    Log in to your account
                  </Button>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{" "}
                  <a
                    href="/modal"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </a>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </React.Fragment>

        <div className={style.carrito}>
          <span>{cantidadCarrito}</span>
          <Dropdown label={<MdOutlineShoppingCart size="30" />} inline={true}>
            <Dropdown.Item>
              <CartList />
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
