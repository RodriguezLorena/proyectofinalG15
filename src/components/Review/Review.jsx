import React from "react";
import { useState } from "react";
import styles from "../Review/Review.module.css"
import { FaStar } from 'react-icons/fa';
import axios from "axios";

export default function Review({ IdProduct }) {
    console.log(IdProduct);

    // const dispatch = useDispatch();
    const [score, setScore] = useState(null);
    const [input, setInput] = useState('');
    const [hover, setHover] = useState(null);

    function handleChange(e) {
        // console.log(e.target.value);
        setInput(e.target.value)
    }


    const user_id = "e17fa82e-ede3-4b2a-91b1-d17c786c988b";
    // const product_id = "6a0ec2fe-15af-4d2c-87c6-c3bd5d335222";

    async function addReview(e) {
        e.preventDefault()
        await axios.post(`http://localhost:3001/review/${IdProduct[0].id}`, {
            score,
            description: input,
            user_id
        })


        setInput('')
        setScore(null)

    }

    return (
        <React.Fragment>
            <div className={styles.formMainContainer}>
                <form >
                    <div className={styles.formContainer}>
                        <div className={styles.formContainerLeft}>

                            <h2>Agrega un comentario </h2>
                            <textarea placeholder="Mi producto me parecio..."
                                name='message' onChange={e => handleChange(e)}
                                value={input}
                                cols="30"
                            />
                            <div className={styles.estrellas}>
                                {
                                    [...Array(5)].map((s, i) => {
                                        let scoreValue = i + 1;
                                        return (
                                            <label>

                                                {/* <input type="radio" name="rating" value={scoreValue} onClick={() => setScore(scoreValue)} /> */}

                                                <FaStar
                                                    size={20}
                                                    onMouseEnter={() => setHover(scoreValue)}
                                                    onMouseLeave={() => setHover(null)}
                                                    value={scoreValue}
                                                    onClick={() => setScore(scoreValue)}
                                                    color={scoreValue <= (hover || score) ? '#ea047e' : '#000000'}

                                                />

                                            </label>
                                        );
                                    })

                                }
                            </div>

                            <div className={styles.formButton}>

                                <button className={styles.bottonPost} onClick={e => addReview(e)}>POST</button>

                            </div>
                        </div>

                        {/* <div className={styles.formContainerRight}>
                            <div className={styles.formDietas}>
                        

                            </div>
                        </div> */}

                    </div>



                </form>
            </div>

        </React.Fragment>
    );

}