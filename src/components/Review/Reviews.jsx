import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews } from "../../redux/action";
import ReviewCard from "./ReviewCard";
import styles from "./Reviews.module.css"
export default function Reviews() {

    const product_id = "6a0ec2fe-15af-4d2c-87c6-c3bd5d335222";

    const productsRevs = useSelector(state => state.reviewsProducts)


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllReviews(product_id))
    }, [])
    // console.log(productsRevs);

    // console.log(productsRevs[0].user.userName,'hola');

    return (

        <div className={styles.container}>
            <h3>{productsRevs.length ? "Comentarios" : "Sin comentarios"}</h3>

            <div>
                {
                    productsRevs?.map(pro => 
                        <ReviewCard username={pro.user.userName} score={pro.score} description={pro.description}/>
                        
                    )

                }


            </div>

        </div>

    );

}