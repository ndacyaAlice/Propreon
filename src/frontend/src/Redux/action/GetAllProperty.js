import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError} from "../../utils/toast";
import  { GetAllProperty } from "../../utils/endpoints"

export const  GetAllPropertyThunk = createAsyncThunk("GetAllProperty",
async(data,{rejectWithValue})=>{
    try{
       const repo = await  GetAllProperty();
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