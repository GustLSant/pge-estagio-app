import { Outlet } from "react-router"

export default function ClientContainerPage(){
    return(
        <div className="client-container-page">
            <h1>Navbar do cliente</h1>
            <Outlet />
        </div>
    )
}