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


const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <Container>
      <Wrapper>
        <LogoContainer>
          <h1>ECOMMERCE</h1>
        </LogoContainer>

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
                <input type="text" placeholder="Buscar Producto" />
              </div>
            </MenuItemLink>
          </MenuItem>
        </Menu>
      </Wrapper>
    </Container>
  );
};

export default Navbar;