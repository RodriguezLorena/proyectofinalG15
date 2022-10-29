import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  putUser,
  getUserId,
  removeAll,
  removeOneProduct,
  login,
  clearUser,
} from "../../redux/action";
import NavBar from "../NavBar/NavBar";
import style from "./PutUser.module.css";
import Cart from "../Cart/Cart";
import swal from "sweetalert";

const PutUser = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const user = useSelector((state) => state.user);
  const cartState = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const [input, setInput] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    image: "",
  });
  const [visiblee, setVisiblee] = useState(false);

  const deleteCart = (id, todos = false) => {
    if (todos) {
      dispatch(removeAll(id));
      swal("todos los productos eliminados");
    } else {
      dispatch(removeOneProduct(id));
      swal({
        title: "Producto eliminado correctamente",
        icon: "success",
        className: "swal-title",
        className: "swal-modal",
      });
    }
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  const z = (e) => {
    e.preventDefault();
    let id = params.id;
    dispatch(getUserId(id));
  };

  function handleSubmit(e, use) {
    e.preventDefault();
    dispatch(putUser(id, input));
    alert("Congratulations");
    // dispatch(clearUser());
    // dispatch(login({ userName: user.userName, password: user.password }));
  }

  const { email, id, password, phoneNumber, role, userName, image } = user;

  return (
    <div className="bg-white">
      <NavBar />
      <div className={style.content}>
        <div className={style.contentPerfile}>
          <div className={style.perileImage}>
            {input.image.length ? (
              <img src={input.image} />
            ) : (
              <img src="https://green.excertia.com/wp-content/uploads/2020/04/perfil-empty.png" />
            )}
            <input
              type="file"
              name="image"
              value={input.image}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <form>
            {/* <button onClick={z}>bton</button> */}
            <div className={style.inputs}>
              <p>Nombre se usuario:</p>
              <h6 className="text-gray-500">{userName}</h6>
              <input
                id="nombreInput"
                type="text"
                name="userName"
                value={input.userName}
                placeholder={userName}
                onChange={(e) => handleChange(e)}
                className={visiblee == false ? style.invisible : style.visible}
              />
            </div>

            <div className={style.inputs}>
              <p>Email:</p>
              <h6 className="text-gray-500">{email}</h6>

              <input
                id="emailInput"
                type="text"
                name="email"
                value={input.email}
                placeholder={email}
                onChange={(e) => handleChange(e)}
                className={visiblee == false ? style.invisible : style.visible}
              />
            </div>

            <div className={style.inputs}>
              <p>Numero de telofono:</p>
              <h6 className="text-gray-500">{phoneNumber}</h6>

              <input
                id="numeberInput"
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                placeholder={phoneNumber}
                onChange={(e) => handleChange(e)}
                className={visiblee == false ? style.invisible : style.visible}
              />
            </div>

            <p
              onClick={() => setVisiblee(true)}
              className="cursor-pointer text-blue-700"
            >
              cambiar datos
            </p>
            {input.userName.length > 0 ||
            input.email.length > 0 ||
            input.phoneNumber.length > 0 ||
            input.image.length > 0 ? (
              <button
                className={style.butonApli}
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Confirmar cambios
              </button>
            ) : null}
          </form>
        </div>

        <div className={style.carrito}>
          <h5>Carrito</h5>
          {cartState.length < 1
            ? "Carrito vacio"
            : cartState.slice(0, 3).map((ele) => {
                return <Cart key={ele.id} data={ele} deleteCart={deleteCart} />;
              })}
          <NavLink to="/carrito" className={style.viewAll}>
            Mostrar todos
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PutUser;
