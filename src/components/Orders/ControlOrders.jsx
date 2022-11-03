import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,Link} from "react-router-dom";
import { getOrders } from "../../redux/action";
import { clearCart } from "../../redux/action";
import style from "./Order.module.css";
import Error401 from "../Error401/Error401";

export default function ControlOrders() {
    const dispatch = useDispatch();
    let params = useParams();
    
    // dispatch(getOrders);
    useEffect(() => {
        dispatch(getOrders());
    }, [])
    const pedidos = useSelector((state) => state.orders);
    const preciototal = useSelector((state) => state.cartTotal);
    const dataUser = useSelector((state) => state.user);
    // console.log(preciototal, 'CART T');

    let obj = {};
    let a = 0
    for (let i = 0; i < pedidos.length; i++) {
        if (i === pedidos.length - 1) {
            a = pedidos[i].order_id
            obj = pedidos[i]
        }
    }

    console.log(obj, 'OBJETO')
    const order_id = a;
    console.log(order_id, 'IDDDDDDDDD');

    function Redirecionar() {
        window.location.href = "/home";
    }

    // const arraydeStatus = ['created', 'pending', 'completed', 'canceled'];

    async function changeStatus(e) {
     
        e.preventDefault()
        if(params.id ===true){
        const cambiar = await axios.put(`https://velvet.up.railway.app/order/${order_id}`, {
            status: "completed"
        })
      

        const mandaremail = await axios.post(`https://velvet.up.railway.app/order/sendingEmail`, {
            firstName: obj.firstName,
            lastName: obj.lastName,
            email: obj.email,   //cambiar aca por el que tiene el user en localstorage
            phoneNumber: obj.phoneNumber,
            direction: obj.direction,
            department: obj.department,
            precioFinal: preciototal,
            status: 'completed',
            postalCode: obj.postalCode
        })

        console.log(mandaremail, "okey se mando");

        limpiarCart()

        Redirecionar()
       }
       else{
        const cambiar1 = await axios.put(`https://velvet.up.railway.app/order/${order_id}`, {
            status: "canceled"
        })
        const mandaremail2 = await axios.post(`https://velvet.up.railway.app/order/sendingEmail`, {
            firstName: obj.firstName,
            lastName: obj.lastName,
            email: obj.email,   //cambiar aca por el que tiene el user en localstorage
            phoneNumber: obj.phoneNumber,
            direction: obj.direction,
            department: obj.department,
            precioFinal: preciototal,
            status: 'canceled',
            postalCode: obj.postalCode
        })
        
        limpiarCart()

        Redirecionar()
       }



    }




    function limpiarCart() {
        dispatch(clearCart());
        // swal("Su carrito esta vacio");
    };



    return (
        obj.status==="created"?
        <div>
            <h3 className={style.titleorder}>GRACIAS POR SU COMPRA!!!</h3>
            <a>

            </a>
            <Link to="/home">
                <button onClick={e => {
                    changeStatus(e)
                }}
                className={style.butonPago}
                >Click Aqui para finalizar</button>
            </Link>
        </div>
        :<Error401></Error401>

    );
}

