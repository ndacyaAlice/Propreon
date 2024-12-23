import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError} from "../../utils/toast";
import  { GetOneProperty } from "../../utils/endpoints"

export const  GetOnePropertyThunk = createAsyncThunk("GetOneProperty",
async(data,{rejectWithValue})=>{
    try{
       const repo = await  GetOneProperty(data);
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