import { Outlet } from "react-router"


export default function AttorneyContainerPage(){

    return(
        <div className="attorney-container-page">
            <h1>Navbar do procurador</h1>
            <Outlet />
        </div>
    )
}