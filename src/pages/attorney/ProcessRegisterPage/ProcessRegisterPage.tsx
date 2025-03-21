import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Process } from "../../../types";
import { registerProcess, simulateNetworkDelay } from "../../../backend/server";
import { BiEdit, BiArrowBack } from "react-icons/bi";
import Button from "../../../components/Button/Button";
import TextInput from "../../../components/TextInput/TextInput";
import './ProcessRegisterPage.css'
import { AuthContext } from "../../../contexts/AuthContext";


type OnChangePropertyNames = 'number' | 'clientFullName' | 'place' | 'courtDivision' | 'court' | 'startDate';
type OnChangeParameters = {
    propertyName: OnChangePropertyNames,
    value: any,
}


export default function ProcessRegisterPage(){
    const [processData, setProcessData] = useState<Process>({
        id: -1,
        number: '',
        status: 'filled',
        attorneyId: -1,                  /* vai pegar o id do usuario atual */
        attorneyFullName: 'placeholder', /* será alterado na função que realiza a requisição */
        clientId: -1,                    /* vai ser pego pelo nome completo escrito no formulario */
        clientFullName: '',
        place: '',
        courtDivision: '',
        court: '',
        startDate: new Date(),
        endDate: undefined,
    })
    const [canShowErrors, setCanShowErrors] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();


    function handleClickBackButton(){
        navigate(-1);
    }


    function handleFormChange({propertyName, value}: OnChangeParameters){
        if(propertyName === 'number'){
            value = value.replace(/[a-zA-Z]/g, "");
        }
        if(propertyName === 'startDate'){
            if(isNaN(new Date(value).getTime())){ return; }
            else{
                const [year, month, day] = value.split('-').map(Number);
                value = new Date(year, month - 1, day);
            }
        }
        setProcessData((prev: Process)=> {return {...prev, [propertyName]: value}});
    }


    function formatDateForInput(date: Date): string{
        return date.toISOString().split("T")[0]; // 'YYYY-MM-DD'
    };


    async function handleClickRegisterProcess(){
        if(
            processData.number !== '' && 
            processData.clientFullName !== '' && 
            processData.place !== '' && 
            processData.courtDivision !== '' && 
            processData.court !== '' &&
            authContext?.user
        ){
            setIsLoading(true);
            
            processData.attorneyId = authContext.user.id;
            processData.attorneyFullName = authContext.user.fullName;

            await simulateNetworkDelay();
            registerProcess(processData)
            .then((response)=>{
                setIsLoading(false);
                console.log(response);
                navigate('/procurador/lista-processos')
            })
            .catch((error)=>{
                setIsLoading(false);
                console.error(error);
            })
            //faz a requisicao aqui
        }
        else{
            setCanShowErrors(true);
        }
    }


    return(
        <div className="process-register-page">
            <header>
                <BiEdit />
                <h2>Cadastrar Processo</h2>
            </header>

            <div>
                <Button label="Voltar" leftIcon={BiArrowBack} onClick={handleClickBackButton} variant="outlined" paddingHorizontal="10px" paddingVertical="5px" />
            </div>

            <section>
                <TextInput label="Número"                   value={processData.number}         onChange={(e)=>{handleFormChange({propertyName: 'number', value: e.target.value})}}         error={canShowErrors && processData.number === ''}        helperText="Insira o número do processo" disabled={isLoading} />
                <TextInput label="Nome completo do cliente" value={processData.clientFullName} onChange={(e)=>{handleFormChange({propertyName: 'clientFullName', value: e.target.value})}} error={canShowErrors && clientFullName === ''}            helperText="Insira o nome do cliente"    disabled={isLoading} />
                <TextInput label="Local"                    value={processData.place}          onChange={(e)=>{handleFormChange({propertyName: 'place', value: e.target.value})}}          error={canShowErrors && processData.place === ''}         helperText="Insira o local do processo"  disabled={isLoading} />
                <TextInput label="Vara"                     value={processData.courtDivision}  onChange={(e)=>{handleFormChange({propertyName: 'courtDivision', value: e.target.value})}}  error={canShowErrors && processData.courtDivision === ''} helperText="Insira o nome da Vara"       disabled={isLoading} />
                <TextInput label="Tribunal"                 value={processData.court}          onChange={(e)=>{handleFormChange({propertyName: 'court', value: e.target.value})}}          error={canShowErrors && processData.court === ''}         helperText="Insira o nome do Tribunal"   disabled={isLoading} />
                <div className="process-page__date-input-container">
                    <p>Data de Início: </p>
                    <input type="date" onKeyDown={(e)=>{e.preventDefault()}} value={formatDateForInput(processData.startDate)} onChange={(e)=>{ handleFormChange({propertyName: 'startDate', value: e.target.value}) }} className={`shadow-01 ${(isLoading) ? 'disabled' : ''}`} disabled={isLoading} />
                </div>
            </section>

            <p onClick={()=>{console.log(processData)}}>auiwdhjauowd</p>

            <footer>
                <Button label="Cadastrar Processo" onClick={handleClickRegisterProcess} loading={isLoading} />
            </footer>
        </div>
    )
}