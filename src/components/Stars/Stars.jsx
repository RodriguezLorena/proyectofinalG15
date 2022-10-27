import React from "react";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export default function Stars({score}) {
    // console.log(props);
    switch (score) {
        case 1:
            return (
                <span>
                    <AiFillStar></AiFillStar>
                    <AiOutlineStar></AiOutlineStar>
                    <AiOutlineStar></AiOutlineStar>
                    <AiOutlineStar></AiOutlineStar>
                    <AiOutlineStar></AiOutlineStar>


                </span>
            );
        case 2:
            return (
                <span>
                    <AiFillStar></AiFillStar>
                    <AiFillStar></AiFillStar>
                    <AiOutlineStar></AiOutlineStar>
                    <AiOutlineStar></AiOutlineStar>
                    <AiOutlineStar></AiOutlineStar>

                </span>
            );
        case 3:
            return (
                <span>
                    <AiFillStar></AiFillStar>
                    <AiFillStar></AiFillStar>
                    <AiFillStar></AiFillStar>
                    <AiOutlineStar></AiOutlineStar>
                    <AiOutlineStar></AiOutlineStar>

                </span>
            );
        case 4:
            return (
                <span>
                    <AiFillStar></AiFillStar>
                    <AiFillStar></AiFillStar>
                    <AiFillStar></AiFillStar>
                    <AiFillStar></AiFillStar>
                    <AiOutlineStar></AiOutlineStar>

                </span>
            );
        case 5:
            return (
                <span>
                    <AiFillStar></AiFillStar>
                    <AiFillStar></AiFillStar>
                    <AiFillStar></AiFillStar>
                    <AiFillStar></AiFillStar>
                    <AiFillStar></AiFillStar>

                </span>
            );

        default:
            return (
                <span>
                    <AiOutlineStar></AiOutlineStar>
                    <AiOutlineStar></AiOutlineStar>
                    <AiOutlineStar></AiOutlineStar>
                    <AiOutlineStar></AiOutlineStar>
                    <AiOutlineStar></AiOutlineStar>

                </span>
            );



    }
}