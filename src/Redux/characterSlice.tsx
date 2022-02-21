import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Icharacters{
    name: string,
    id: number,
    status: string,
    species: string,
    type: string,     
    gender: string,
    image: string,
    url: string,
    created: string,   
}

interface IinitialState{
    characters: Icharacters[],
    episode: string,
    location: string,
    loading: boolean,
    error: null | string,
    detail: null | number,
    liked: number[]
}


export const getCharacters = createAsyncThunk(
    "character/get",
    async function (id:number | null = 1, {rejectWithValue}){
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${id}`)

            if(response.status !== 200){
                throw new Error(response.statusText)
            }
            return response.data.results
        } catch (error:any) {
            return rejectWithValue(error.message)
        }
    }
)
export const getEpisode = createAsyncThunk(
    "character/getEpisode",
    async function (id:number | null, {rejectWithValue}){
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`)

            if(response.status !== 200){
                throw new Error(response.statusText)
            }
            return response.data.episode
        } catch (error:any) {
            return rejectWithValue(error.message)
        }
    }
)
export const getLocation = createAsyncThunk(
    "character/getLocation",
    async function (id:number | null, {rejectWithValue}){
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`)

            if(response.status !== 200){
                throw new Error(response.statusText)
            }
            return response.data.name
        } catch (error:any) {
            return rejectWithValue(error.message)
        }
    }
)

let initialState = {
    characters:[],
    episode: "",
    location: "",
    loading: true,
    error: null,
    detail: null,
    liked: []

} as IinitialState

const setPending = (state:any) =>{
    state.loading = true
    state.error = null
}
const setError = (state:any, action:any) =>{
    state.error = action.payload
}

const characterSlice = createSlice({
    name: "character",
    initialState,
    reducers:{
        addToDetail(state, action){
            state.detail = action.payload
        },
        addToLiked(state, action){
            state.liked.push(action.payload)
        },
        delFromLiked(state, action){
            state.liked = state.liked.filter(k => k !== action.payload)
        },
    },
    extraReducers:{
        [getCharacters.pending.type]: setPending,
        [getCharacters.fulfilled.type]: (state, action) =>{
            state.characters = action.payload
            state.loading = false
        },
        [getCharacters.rejected.type]: setError,
        [getEpisode.pending.type]: setPending,
        [getEpisode.fulfilled.type]: (state, action) =>{
            state.episode = action.payload
            state.loading = false
        },
        [getEpisode.rejected.type]: setError,
        [getLocation.pending.type]: setPending,
        [getLocation.fulfilled.type]: (state, action) =>{
            state.location = action.payload
            state.loading = false
        },
        [getLocation.rejected.type]: setError
    }
})
export const { addToDetail, addToLiked, delFromLiked } = characterSlice.actions

export default characterSlice.reducer