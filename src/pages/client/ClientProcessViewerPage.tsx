import { useContext, useEffect, useState } from "react";
import { Process, ProcessStatus, Response, User } from "../../types";
import { useNavigate, useParams } from "react-router";
import { formatDate, getDiegestableStatusName } from "../../utils";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import { BiFile } from "react-icons/bi";
import { BiArrowBack } from "react-icons/bi";
import './ClientProcessViewerPage.css'
import { getProcessById, simulateNetworkDelay } from "../../backend/server";


export default function ClientProcessViewerPage(){
    const { id } = useParams();
    const [data, setData] = useState<Process | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const authContext: AuthContextType | undefined = useContext(AuthContext);
    const navigate = useNavigate();


    function handleClickBackButton(){
        navigate(-1);
    }


    async function getProcess(){
        await simulateNetworkDelay();

        if(authContext?.user){
            getProcessById(Number(id), authContext.user)
            .then((response: Response)=>{
                setData(response.data);
                setIsLoading(false);
            })
            .catch((error: Response)=>{
                console.error(error);
                setIsLoading(false);
            })
        }
    }


    useEffect(()=>{
        getProcess()
    }, [])


    return(
        <div className="client-process-viewer-page">
            <header className="process-list-page__header">
                <BiFile />
                <h2>Visualizar Processo</h2>
            </header>
            
            <div onClick={handleClickBackButton} className="process-viewer-page__back-button">
                <BiArrowBack />
                <p>Voltar</p>
            </div>

            {
                (isLoading) ? <LoadingIcon /> :
                (data === undefined) ? <p>Algo deu errado, por favor recarregue a página.</p> :
                <>
                    <p>Processo de número: {data.number}</p>

                    <div className="process-viewer-page__infos-container">
                        <div className="row-separator"></div>

                        <div className="process-viewer-page__info">
                            <p>Status:</p>
                            <p>{getDiegestableStatusName(data.status)}</p>
                        </div>

                        <div className="row-separator"></div>

                        <div className="process-viewer-page__info">
                            <p>Local de tramitação:</p>
                            <p>{data.place}</p>
                        </div>

                        <div className="row-separator"></div>

                        <div className="process-viewer-page__info">
                            <p>Vara:</p>
                            <p>{data.courtDivision}</p>
                        </div>

                        <div className="row-separator"></div>

                        <div className="process-viewer-page__info">
                            <p>Tribunal:</p>
                            <p>{data.court}</p>
                        </div>

                        <div className="row-separator"></div>

                        <div className="process-viewer-page__info">
                            <p>Data de início:</p>
                            <p>{formatDate(data.startDate)}</p>
                        </div>

                        <div className="row-separator"></div>

                        <div className="process-viewer-page__info">
                            <p>Data de fim:</p>
                            <p>{(data.endDate) ? formatDate(data.endDate) : '-'}</p>
                        </div>

                        <div className="row-separator"></div>
                    </div>
                </>
            }
        </div>
    )
}