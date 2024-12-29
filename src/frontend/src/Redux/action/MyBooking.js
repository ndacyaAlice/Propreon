import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError} from "../../utils/toast";
import  { MyBooking } from "../../utils/endpoints"

export const  MyBookingThunk = createAsyncThunk("MyBooking",
async(data,{rejectWithValue})=>{
    try{
       const repo = await  MyBooking();
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