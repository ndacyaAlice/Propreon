import React, { useEffect } from "react";
import {
  Box,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { GetAllPropertyThunk } from "@/Redux/action/GetAllProperty";




const BuildingTable = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
   dispatch(GetAllPropertyThunk())
  },[dispatch])


  
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "Title", headerName: "Property Title", width: 150 },
    { field: "Bedroom", headerName: "Bedroom", width: 150 },
    { field: "Bathroom", headerName: "Bathroom", width: 150 },
    { field: "Parking", headerName: " Parking", width: 150 },
    { field: "Location", headerName: "Location", width: 150 },
    { field: "PricePerVisit", headerName: "PricePerVisit", width: 150 },
    { field: "CreatedAt", headerName: "CreatedAt", width: 150 },
    { field: "UpdatedAt", headerName: "UpdatedAt", width: 150 },
    {
      field: "Bookings",
      headerName: "Bookings",
      renderCell: (params) => (
        <Button  onClick={() => handleClickOpen(params.row)}>
          <a  href={`Property/${params.row.id}/bookings`}>Bookings</a>
        </Button>
      ),
      width: 150,

    },
  ];
  const  {  loads,GetAllProperty,errorz } = useSelector((state)=>state.GetAllProperty)
  return (
    <Box
      sx={{
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
        },
      }}
    >
         {loads?
     (<div style={{textAlign: "center"}}>
      <p>Loading....</p>
   </div>):  
   (GetAllProperty?.length  === 0|| errorz)?(
    <div style={{textAlign: "center"}}>
          <p>No Property</p>
    </div>
  ):(
      <DataGrid
          getRowId={(row)=>(row.id)}
          rows={GetAllProperty}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
          sx={{
            backgroundColor: '#f5f5f5', // Light gray background
            '& .MuiDataGrid-row': {
              backgroundColor: '#ffffff', // White row background
              '&:nth-of-type(odd)': {
                backgroundColor: '#f9f9f9', // Alternate row color
              },
            },
            boxShadow: '0 4px 10px rgba(200, 200, 200, 0.7)',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        />
      )} 
    </Box>
  );
};

export default BuildingTable;

