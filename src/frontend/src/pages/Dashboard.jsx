import Sidebar from "@/components/Mycomponent/SideBar";
import React,{useState} from "react";


const Dashboard=()=>{
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return(
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    )
}

export default Dashboard