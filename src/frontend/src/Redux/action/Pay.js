import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError} from "../../utils/toast";
import { Pay } from "../../utils/endpoints";

export const  PayThunk = createAsyncThunk("Pay",
async(data,{rejectWithValue})=>{
    try{
       const repo = await  Pay(data);
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