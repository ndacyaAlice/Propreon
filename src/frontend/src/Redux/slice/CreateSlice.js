import { createSlice } from "@reduxjs/toolkit";
import { CreatePropertyThunk } from "../action/CreateProperty";

const initialState = {
    load: false,
    CreateProperty: null,
    error: null,
}

const CreatePropertySlice= createSlice({
    name: "CreateProperty",
    initialState,
    reducers: {

    },

    extraReducers: {
      [CreatePropertyThunk.pending] : (state) =>{
        return{
            ...state,
            load: true
        }
      },
      [CreatePropertyThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            error:payload
        }
      },
      [CreatePropertyThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            load: false,
            CreateProperty: payload
        }
      }  
    }
})

export default CreatePropertySlice.reducer