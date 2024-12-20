import TopBar from "@/components/Mycomponent/topBar";
import { Outlet } from "react-router";

const Layout=() => {
    return(
    <>
    <TopBar/>
     <Outlet/>
    </>
    
    )
}

export default Layout