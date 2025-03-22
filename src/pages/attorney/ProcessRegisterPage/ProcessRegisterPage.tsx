import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import { Process } from "../../../types";
import { registerProcess, simulateNetworkDelay } from "../../../backend/server";
import { BiEdit, BiArrowBack } from "react-icons/bi";
import Button from "../../../components/Button/Button";
import TextInput from "../../../components/TextInput/TextInput";
import LoadingIcon from "../../../components/LoadingIcon/LoadingIcon";
import './ProcessRegisterPage.css'


// esses tipos sao exportados pq tambem sao usados na pagina de editar processo
export type OnChangePropertyNames = 'number' | 'clientFullName' | 'place' | 'courtDivision' | 'court' | 'startDate';
export type OnChangeParameters = {
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
        }
        else{
            setCanShowErrors(true);
        }
    }


    return(
        <div className="process-register-page">
            <header className="fade-in-top">
                <BiEdit />
                <h2>Cadastrar Processo</h2>
            </header>

            <div className="fade-in-top">
                <Button label="Voltar" leftIcon={BiArrowBack} onClick={handleClickBackButton} variant="outlined" paddingHorizontal="10px" paddingVertical="5px" />
            </div>

            {
                isLoading ? <LoadingIcon /> :
                <>
                    <section className="fade-in-left">
                        <TextInput label="Número"                   value={processData.number}         onChange={(e)=>{handleFormChange({propertyName: 'number', value: e.target.value})}}         error={canShowErrors && processData.number === ''}         helperText="Insira o número do processo" />
                        <TextInput label="Nome completo do cliente" value={processData.clientFullName} onChange={(e)=>{handleFormChange({propertyName: 'clientFullName', value: e.target.value})}} error={canShowErrors && processData.clientFullName === ''} helperText="Insira o nome do cliente"    />
                        <TextInput label="Local"                    value={processData.place}          onChange={(e)=>{handleFormChange({propertyName: 'place', value: e.target.value})}}          error={canShowErrors && processData.place === ''}          helperText="Insira o local do processo"  />
                        <TextInput label="Vara"                     value={processData.courtDivision}  onChange={(e)=>{handleFormChange({propertyName: 'courtDivision', value: e.target.value})}}  error={canShowErrors && processData.courtDivision === ''}  helperText="Insira o nome da Vara"       />
                        <TextInput label="Tribunal"                 value={processData.court}          onChange={(e)=>{handleFormChange({propertyName: 'court', value: e.target.value})}}          error={canShowErrors && processData.court === ''}          helperText="Insira o nome do Tribunal"   />
                        <div className="process-page__date-input-container">
                            <p>Data de Início: </p>
                            <input type="date" onKeyDown={(e)=>{e.preventDefault()}} value={formatDateForInput(processData.startDate)} onChange={(e)=>{ handleFormChange({propertyName: 'startDate', value: e.target.value}) }} className="shadow-01" />
                        </div>
                    </section>

                    <footer className="fade-in-left">
                        <Button label="Cadastrar Processo" onClick={handleClickRegisterProcess} />
                    </footer>
                </>
            }
        </div>
    )
}