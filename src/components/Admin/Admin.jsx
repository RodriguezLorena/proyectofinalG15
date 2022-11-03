import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Admin.module.css";
import Error401 from "../Error401/Error401";
import { useDispatch, useSelector } from "react-redux";
export default function Admin() {
  const user = useSelector((state) => state.user);
  return (
    user.role === "admin"?
    <div className={style.content}>
      <NavLink to="/admin"> usuario ADMIN</NavLink>{" "}
    </div>
    : <Error401></Error401>
  );
}
