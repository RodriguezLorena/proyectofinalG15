import React, { useState } from "react";
import {
  Container,
  LogoContainer,
  Wrapper,
  Menu,
  MenuItem,
  MenuItemLink,
  MobileIcon,
} from "./NavbarElement";
import {
  FaBars,
  FaTimes,
  FaUserAlt,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";

import { getForName } from "../../../redux/action";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
    <Container>
      <Wrapper>
        <Link to="/">
          <LogoContainer>
            <h1>ECOMMERCE</h1>
          </LogoContainer>
        </Link>

        <MobileIcon onClick={() => setShowMobileMenu(!showMobileMenu)}>
          {showMobileMenu ? <FaTimes size="25" /> : <FaBars size="25" />}
        </MobileIcon>

        <Menu open={showMobileMenu}>
          <MenuItem>
            <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <div>
                <FaUserAlt size="25" />
              </div>
            </MenuItemLink>
          </MenuItem>
          <MenuItem>
            <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <div>
                <FaShoppingCart size="25" />
              </div>
            </MenuItemLink>
          </MenuItem>
          <MenuItem>
            <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <div>
                <FaSearch size="20" />
                <form action="" onSubmit={(e) => searchForName(e)}>
                  <input
                    type="text"
                    placeholder="Buscar Producto"
                    value={search}
                    onChange={(e) => handelSearch(e)}
                  />
                  <input type="submit" name=" " />
                </form>
              </div>
            </MenuItemLink>
          </MenuItem>
        </Menu>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
