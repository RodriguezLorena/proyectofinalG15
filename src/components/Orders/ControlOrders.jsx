import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../redux/action";


export default function ControlOrders() {
    const dispatch = useDispatch();
    // dispatch(getOrders);
    useEffect(() => {
        dispatch(getOrders());
    }, [])
    const pedidos = useSelector((state) => state.orders);
    const preciototal = useSelector((state) => state.cartTotal);
    // console.log(preciototal, 'CART T');

    let obj = {};
    let a = 0
    for (let i = 0; i < pedidos.length; i++) {
        if (i === pedidos.length - 1) {
            a = pedidos[i].order_id
            obj = pedidos[i]
        }
    }

    // console.log(obj)
    const order_id = a;


    // const arraydeStatus = ['created', 'pending', 'completed', 'canceled'];

    async function changeStatus(e) {
        e.preventDefault()

        const cambiar = await axios.put(`https://velvet.up.railway.app/order/${order_id}`, {
            status: "created"
        })
        console.log(cambiar);

        const mandaremail = await axios.post(`https://velvet.up.railway.app/order/sendingEmail`, {
            firstName: obj.firstName,
            lastName: obj.lastName,
            email: obj.email,   //cambiar aca por el que tiene el user en localstorage
            phoneNumber: obj.phoneNumber,
            direction: obj.direction,
            department: obj.department,
            precioFinal: preciototal,

            postalCode: obj.postalCode
        })

        console.log(mandaremail, "okey se mando");


    }


    return (
        <div>
            <h3>GRACIAS POR SU COMPRA</h3>
            {/* <Link to="/"> */}
            <button onClick={changeStatus}>Click Aqui para finalizar!</button>
            {/* </Link> */}
        </div>


    );
}

{/* 
            <div>
                {
                    pedidos?.map(pedi => {
                        return (
                            <div>
                                <p>{pedi.order_id}</p>
                                <div>
                                    <h1>{pedi.firstName + " " + pedi.lastName} </h1>
                                </div>
                                <div>
                                    <h1>{pedi.email}</h1>
                                </div>
                                <div>
                                    <select >
                                        {

                                            arraydeStatus?.map(e => {
                                                return (
                                                    <option >{e}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                        );
                    })
                } */}
{/* <h1>ESTADO: </h1> */ }

{/* <select onChange={e => e}>
                    <option value="pending">pending</option>
                    <option value="completed">completed</option>
                    <option value="canceled">canceled</option>
                    <option value="created">created</option>
                    <option value="cart">cart</option>

                </select> */}
{/* </div> */ }


