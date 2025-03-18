import { Outlet } from "react-router"
import Navbar from "../../components/Navbar/Navbar"
import './AppLayout.css'


export default function AppLayout(){
    return(
        <div className="app-layout">
            <Navbar />
            <div className="app-layout__content-container">
                <Outlet />
            </div>
        </div>
    )
}