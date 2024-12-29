import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import ViewPage from "./pages/ViewPage";
import Homepage from "./pages/Homepage";
import AdminLayout from "./pages/AdminLayout";
import BuildingTable from "./components/Mycomponent/BuildingTable";
import CreateProperty from "./components/Mycomponent/CreateProperty";
import { AuthContextProvider } from "./context/Auth";
import BookByPropertyTable from "./components/Mycomponent/BookByPropertyTable";
import MyBookTable from "./components/Mycomponent/MyBookTable";


const routes = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {path: '/', element: <Homepage/>},
            {path:'Property/:id',element:<ViewPage/>}
        ]
    },
    {
        path: '/',
        element: <AuthContextProvider><AdminLayout/></AuthContextProvider>,
        children: [
            {path: 'PropertyLists/', element: <BuildingTable/>},
            {path: 'CreateProperty/', element:<CreateProperty/>},
            {path:"Property/:id/bookings/", element:<BookByPropertyTable/>},
            {path: "MyBookings/", element:<MyBookTable/>}
        ]
    },
]   
const router = (
    <BrowserRouter>
        <Routes>
            {routes.map((route) =>(
                <Route key={route.path} path={route.path} element={route.element} >
                    {route.children.map((child) => (
                        <Route  key={child.path} path={child.path} element={child.element}/>
                    ))}
                </Route>
            ))}
        </Routes>
    </BrowserRouter>
);
const App =() =>{
  return router;
}

export default App;