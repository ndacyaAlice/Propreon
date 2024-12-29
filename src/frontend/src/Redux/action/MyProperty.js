import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError} from "../../utils/toast";
import  { getMyProperty } from "../../utils/endpoints"

export const  getMyPropertyThunk = createAsyncThunk("getMyProperty",
async(data,{rejectWithValue})=>{
    try{
       const repo = await  getMyProperty();
       if(repo.Ok){
        return repo.Ok
       }else if(repo.Err){
        {repo.Err.Error && ToastError(repo.Err.Error)}
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue(error.Err)
    }
}
);