import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToDetail } from "../Redux/characterSlice";
import { RootState } from "../Redux/store";
import styles from "./styles.module.scss"

const Liked = () =>{
    const dispatch = useDispatch();
    const {characters, liked} = useSelector( (state:RootState) => state.items)

    const filterArr = characters.slice().filter((k) => liked.some((s:number) => k.id === s))
    return(
        <div className={styles.likedBlock}>
            {filterArr && filterArr.map(k=>(
                <Link to="/Detail" key={k.id} onClick={() => dispatch(addToDetail(k.id))}>{k.name}</Link>
            ))}
        </div>
    )
}

export default Liked