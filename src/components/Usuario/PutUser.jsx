import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, putUser, getUserId } from "../../redux/action";

const PutUser = () => {
  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    //console.log(id)
    dispatch(getUser());
    //dispatch(getUserId('8bbeaa98-f7ed-4fd6-be7b-4655abaeebb0'));
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
    <form>
      <button onClick={z}>bton</button>
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

      <input
        type="file"
        name="image"
        value={input.image}
        onChange={(e) => handleChange(e)}
      ></input>
      {input.image.length ? <p src={input.image}></p> : <p>{image}</p>}
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
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          click
        </button>
      ) : input.email.length > 0 ? (
        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          click
        </button>
      ) : input.phoneNumber.length > 0 ? (
        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          click
        </button>
      ) : input.image.length > 0 ? (
        <button
          onClick={(e) => {
            handleSubmit(e, user);
          }}
        >
          click
        </button>
      ) : null}
    </form>
  );
};

export default PutUser;
