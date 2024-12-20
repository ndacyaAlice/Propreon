import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError, ToastSuccess } from "../../utils/toast";
import  { CreateProperty } from "../../utils/endpoints"

export const  CreatePropertyThunk = createAsyncThunk(" CreateProperty",
async(data,{rejectWithValue})=>{
    try{
       const repo = await  CreateProperty(data);
       if(repo.Ok){
        ToastSuccess("Create successfully")
        return repo.Ok
       }else if(repo.Err){
        {repo.Err.Error && ToastError(repo.Err.Error)}
        {repo.Err.InvalidPayload && ToastError(repo.Err.InvalidPayload)}
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue(error.Err)
    }
}
);