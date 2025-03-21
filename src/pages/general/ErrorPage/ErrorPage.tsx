import { useNavigate } from "react-router";
import Button from "../../../components/Button/Button";
import './ErrorPage.css'


export default function ErrorPage(){
    const navigate  = useNavigate();

    return(
        <div className="error-page">
            <div className="shadow-01">
                <h1>Erro 404</h1>
                <div>
                    <p>A página procurada não foi encontrada. </p> 
                    <p>Por favor, volte para a página anterior.</p>
                </div>
                <Button label="Voltar" onClick={()=>{navigate(-1)}} fontSize="1.0em" />
            </div>
        </div>
    )
}