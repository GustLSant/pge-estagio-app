import TextInput from "../../components/TextInput/TextInput";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import { Process, ProcessStatus, Response } from "../../types";
import { getProcessListByUserId, simulateNetworkDelay } from "../../backend/server";
import { formatDate, makeStatusDiegestible } from "../../utils";
import { BiFile } from "react-icons/bi";
import { BiSortDown } from "react-icons/bi";
import { BiSortUp } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import './ClientProcessListPage.css';
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";


type FilterType = 'none' | ProcessStatus;
type SortType = 'none' | 'crescent' | 'descrescent';


export default function ClientProcessListPage(){
    const [filter, setFilter] = useState<FilterType>('none');
    const [sortMethod, setSortMethod] = useState<SortType>('none');
    const [searchString, setSearchString] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const [rawData, setRawData] = useState<Process[]>([]);
    const [refinedData, setRefinedData] = useState<Process[]>([]);
    const authContext:AuthContextType | undefined = useContext(AuthContext);
    const navigate = useNavigate();


    function handleClickFilterOption(newFilter:FilterType): void{
        setFilter(newFilter);
    }

    function handleClickSortButton(): void{
        if(sortMethod === 'none'){ setSortMethod('crescent'); }
        else if(sortMethod === 'crescent'){ setSortMethod('descrescent'); }
        else{ setSortMethod('none'); }
    }

    function handleChangeSearchString(e: React.ChangeEvent<HTMLInputElement>): void{
        if(!/[a-zA-Z]/.test(e.target.value)){
            setSearchString(e.target.value);
        }
    }


    async function fetchData(): Promise<void>{
        if(authContext?.user){
            await simulateNetworkDelay();

            getProcessListByUserId(authContext.user.id)
            .then((response: Response)=>{
                setIsLoading(false);
                setRawData(response.data);
                setRefinedData(response.data);
            })
            .catch((error: Response)=>{
                setIsLoading(false);
                setHasError(true);
                console.log('Erro ao requisitar dados do sessionStorage: ', error);
            })
        }
        else{
            setIsLoading(false);
            setHasError(true);
            console.log('Erro ao requisitar dados do sessionStorage: Id do usuário nao encontrado no AuthContext');
        }
    }

    useEffect(()=>{
        fetchData();
    }, [])


    function refineData(): void{
        const newArray: Process[] = [];

        rawData.forEach((element)=>{
            if(filter !== 'none'){
                if(element.status !== filter){
                    return;
                }
            }
            
            if(searchString !== ''){
                if(!element.number.toString().includes(searchString)){
                    return;
                }
            }

            newArray.push(element);
        })

        if(sortMethod !== 'none'){
            newArray.sort((a: Process, b: Process)=>{
                if(sortMethod === 'crescent'){ return a.startDate.getTime() - b.startDate.getTime(); }
                else{ return b.startDate.getTime() - a.startDate.getTime(); }
            })
        }
        
        setRefinedData([...newArray]);
    }


    useEffect(()=>{
        refineData()
    }, [filter, sortMethod, searchString])


    function countElementsByFilter(filter:FilterType): number{
        let count = 0;

        rawData.forEach((element)=>{
            if(element.status === filter){ count++; }
        })

        return count;
    }


    function handleClickProcess(id: number): void{
        navigate(`/cliente/visualizar-processo/${id}`);
    }


    return(
        <div className="client-process-list-page">
            <section className="process-list-page__header">
                <BiFile />
                <h2>Processos</h2>
            </section>
            
            <section className="process-list-page__container-settings">
                <div className="process-list-page-settings__container-filters">
                    <div className={`process-list-page__filter-option ${(filter === 'none') ? 'active' : ''}`} onClick={()=>{handleClickFilterOption('none')}} >
                        <p>Total</p>
                        <p>{(rawData.length === 0) ? '-' : rawData.length}</p>
                    </div>
                    <div className={`process-list-page__filter-option ${(filter === 'filled') ? 'active' : ''}`} onClick={()=>{handleClickFilterOption('filled')}} >
                        <p>Autuado</p>
                        <p>{(rawData.length === 0) ? '-' : countElementsByFilter('filled')}</p>
                    </div>
                    <div className={`process-list-page__filter-option ${(filter === 'pending') ? 'active' : ''}`} onClick={()=>{handleClickFilterOption('pending')}} >
                        <p>Em Andamento</p>
                        <p>{(rawData.length === 0) ? '-' : countElementsByFilter('pending')}</p>
                    </div>
                    <div className={`process-list-page__filter-option ${(filter === 'ruled') ? 'active' : ''}`} onClick={()=>{handleClickFilterOption('ruled')}} >
                        <p>Julgado</p>
                        <p>{(rawData.length === 0) ? '-' : countElementsByFilter('ruled')}</p>
                    </div>
                    <div className={`process-list-page__filter-option ${(filter === 'suspended') ? 'active' : ''}`} onClick={()=>{handleClickFilterOption('suspended')}} >
                        <p>Suspenso</p>
                        <p>{(rawData.length === 0) ? '-' : countElementsByFilter('suspended')}</p>
                    </div>
                </div>

                <div className={`process-list-page-settings__sort-button shadow-01 ${(sortMethod !== 'none') ? 'active' : ''}`} onClick={handleClickSortButton}>
                    {
                        (sortMethod !== 'descrescent') ? 
                        <BiSortUp style={{transform: 'scaleY(-1.0)'}} /> :
                        <BiSortDown />
                    }
                    {
                        (sortMethod === 'none') ? <p>Ordenar por data</p> :
                        (sortMethod === 'crescent') ? <p>Ordenado por data crescente</p> :
                        <p>Ordenado por data decrescente</p>
                    }
                </div>
            </section>
            
            <TextInput label="Pesquisar por número" value={searchString} onChange={handleChangeSearchString} />
        
            <section className="process-list-page__table-section">
                {
                    hasError ? <p>Algo deu errado, por favor recarregue a página.</p>
                    :
                    isLoading ? <LoadingIcon />
                    :
                    (refinedData.length === 0) ? <p>Nenhum processo encontrado.</p> :
                    <table className="process-list-page__table">
                        <thead>
                            <tr>
                                <th>Número de Identificação</th>
                                <th>Status</th>
                                <th>Data de início</th>
                                <th>Data de fim</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                refinedData.map((element:Process, idx)=>{
                                    return(
                                        <tr key={idx} onClick={()=>{handleClickProcess(element.id)}}>
                                            <td>{element.number}</td>
                                            <td>{makeStatusDiegestible(element.status)}</td>
                                            <td>{formatDate(element.startDate)}</td>
                                            <td>{formatDate(element.endDate)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </section>
        </div>
    )
}