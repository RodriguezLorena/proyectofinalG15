import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, putUser, getUserId } from "../../redux/action";
import NavBar from "../NavBar/NavBar";
import style from "./PutUser.module.css";

const PutUser = () => {
  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const user = useSelector((state) => state.user);

  const [input, setInput] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    image: "",
  });

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
    console.log("esto es use", use);
    console.log("esto se va", input);
    dispatch(putUser(id, input));
    alert("Congratulations");
  }

  const { email, id, password, phoneNumber, role, userName, image } = user;

  console.log("image ", user);
  console.log("input.image", input.image);

  return (
    <div className="bg-white">
      <NavBar />
      <div className={style.content}>
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
          <label>
            NOMBRE:
            <input
              id="nombreInput"
              type="text"
              name="userName"
              value={input.userName}
              placeholder={userName}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label>
            EMAIL:
            <input
              id="emailInput"
              type="text"
              name="email"
              value={input.email}
              placeholder={email}
              onChange={(e) => handleChange(e)}
            />
          </label>
          {/* <img src={image} alt='♥' /> */}

          <label>
            PHONE NUMBER:
            <input
              id="numeberInput"
              type="text"
              name="phoneNumber"
              value={input.number}
              placeholder={phoneNumber}
              onChange={(e) => handleChange(e)}
            />
          </label>
          {/*  {
        input.name.length > 0 || input.email.length > 0 || input.number.length > 0 || input.image.length > 0 || <button onClick={(e) => {handleSubmit(e)}}>click</button>
      } */}
          {input.userName.length > 0 ? (
            <button
              className={style.butonApli}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Confirmar cambios
            </button>
          ) : input.email.length > 0 ? (
            <button
              className={style.butonApli}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Confirmar cambios
            </button>
          ) : input.phoneNumber.length > 0 ? (
            <button
              className={style.butonApli}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Confirmar cambios
            </button>
          ) : input.image.length > 0 ? (
            <button
              className={style.butonApli}
              onClick={(e) => {
                handleSubmit(e, user);
              }}
            >
              Confirmar cambios
            </button>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default PutUser;
