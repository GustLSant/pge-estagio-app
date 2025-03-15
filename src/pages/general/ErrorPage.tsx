import { useNavigate } from "react-router";
import './ErrorPage.css'


export default function ErrorPage(){
    const navigate  = useNavigate();

    return(
        <div className="error-page">
            <h1>Error Page</h1>
            <p onClick={() => navigate(-1)} style={{textDecoration: 'underline'}}>Voltar</p>
            <small>se essa pagina estiver em branco, é porque eu esqueci de terminar ela</small>
        </div>
    )
}