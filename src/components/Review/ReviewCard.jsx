import React from "react";
import styles from "../Review/ReviewCard.module.css"
import Stars from "../Stars/Stars"
export default function ReviewCard({ username, score, description }) {

    console.log(score);
    return (

        <div className={styles.container}>

            <ul>
                <li>


                    <div>
                        {description}
                    </div>
                    <div>
                        <a>{username}</a>
                    </div>
                    <div className={styles.commentsIcons}>
                        <i className={styles.iconsPosition}><Stars score={score}></Stars></i>
                    </div>

                </li>

            </ul>

        </div>
    );

}