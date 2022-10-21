import React, { useState } from "react";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import style from "./NavBar.module.css";
import CartList from "../CartList/CartList";
import Logo from "../../img/logoVelvet.png";
import { getForName } from "../../redux/action";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function NavBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function handelSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function searchForName(e) {
    e.preventDefault();
    dispatch(getForName(search));
    setSearch("");
  }
  return (
    <div className={style.content}>
      <Link to="/">
        <img src={Logo} alt="logo" width="130" height="130" />
      </Link>
      <div className={style.contentIcons}>
        <FaUserAlt className="mr-10" size="20" />
        <div className="mr-5">
          <Dropdown label={<FaShoppingCart size="20" />} inline={true}>
            <Dropdown.Item>
              <CartList />
            </Dropdown.Item>
          </Dropdown>
        </div>
        <form action="" onSubmit={(e) => searchForName(e)}>
          <Link to="/home">
            <input
              type="text"
              placeholder="Buscar Producto..."
              value={search}
              onChange={(e) => handelSearch(e)}
              className={style.inputSearch}
            />
          </Link>
          <button type="submit" name="serach" className=" h-10">
            <FaSearch size="20" />
          </button>
        </form>
      </div>
    </div>
  );
}
