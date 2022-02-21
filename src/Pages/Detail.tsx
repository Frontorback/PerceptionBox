import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEpisode, getLocation } from "../Redux/characterSlice";
import { RootState } from "../Redux/store";

const Detail = () =>{
    const {characters, episode, location, detail} = useSelector( (state:RootState) => state.items)
    const resultItem = characters.filter( d => d.id === detail)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getEpisode(detail))
        dispatch(getLocation(detail))
    },[dispatch, detail])

    return (
        <div>         
            <div>Name: <span>{resultItem[0].name}</span></div>
            <div>Species: <span>{resultItem[0].species}</span></div>
            <div>Gender: <span>{resultItem[0].gender}</span></div>
            <div>location: <span>{location}</span></div>
            <div>Episode: <span>{episode}</span></div>
            <div>Status: <span>{resultItem[0].status}</span></div>
            <div>Created: <span>{resultItem[0].created}</span></div>
        </div>
    )
}

export default Detail