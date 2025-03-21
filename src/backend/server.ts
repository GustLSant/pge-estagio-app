import { defaultDatabase } from './database';
import { AccountCredentials, Process, User, Response } from '../types';


export function simulateNetworkDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, Math.random()*1000+500));
}


export function initializeDatabase(){
    if(sessionStorage.getItem('accountCredentials') === null){
        saveDefaultDatabaseOnSessionStorage();
    }
}

function saveDefaultDatabaseOnSessionStorage(){
    sessionStorage.setItem('accountCredentials', JSON.stringify(defaultDatabase.accountCredentials));
    sessionStorage.setItem('users', JSON.stringify(defaultDatabase.users));
    sessionStorage.setItem('process', JSON.stringify(defaultDatabase.process));
}


export function tryLogin(email: string, password: string): Promise<Response>{
    return new Promise((resolve, reject)=>{
        const sessionData: string | null = sessionStorage.getItem('accountCredentials');
        
        if(sessionData){
            const accountCredentials: AccountCredentials[] = JSON.parse(sessionData);
            const foundAccount: AccountCredentials | undefined = accountCredentials.find((element)=>{return (element.email === email)});
            
            if(foundAccount){
                if(foundAccount.password === password){
                    const userData: User | undefined = getUserDataFromAccountCredentials(foundAccount);
                    if(userData){
                        userData.registerDate = new Date(userData.registerDate); /* convertendo a string de volta para Date */
                        resolve({
                            status: 200,
                            message: 'Login bem sucedido.',
                            data: userData,
                        });
                    }
                    else{
                        console.error('O usuario relacionado à essas credenciais não foi encontrado no sessionStorage.')
                        reject({
                            status: 404,
                            message: 'Usuário com o id fornecido não foi encontrado.',
                            data: null,
                        });
                    }
                }
                else{
                    reject({
                        status: 401,
                        message: 'Credenciais não encontradas.',
                        data: null,
                    });
                }
            }
            else{
                reject({
                    status: 401,
                    message: 'Credenciais não encontradas.',
                    data: null,
                });
            }
        }
        else{
            console.error('AccountCredentials não encontrada no sessionStorage.')
            reject({
                status: 404,
                message: 'Banco de dados não encontrado.',
                data: null,
            });
        }
    })
}


export function getUserDataFromSessionStorage(): User | undefined{
    const sessionData: string | null = sessionStorage.getItem('currentUser');
    
    if(sessionData){
        const userFromSessionStorage: User | undefined = JSON.parse(sessionData);

        if(userFromSessionStorage){
            userFromSessionStorage.registerDate = new Date(userFromSessionStorage.registerDate); /* convertendo a string de volta para Date */
            return userFromSessionStorage;
        }
    }

    return undefined;
}


export function tryChangePassword(user: User, currentPassword: string, newPassword: string): Promise<Response>{
    return new Promise<Response>((resolve, reject)=>{
        const sessionData: string | null = sessionStorage.getItem('accountCredentials');
    
        if(sessionData){
            const accountCredentials: AccountCredentials[] = JSON.parse(sessionData);
            const foundAccount: AccountCredentials | undefined = accountCredentials.find((element: AccountCredentials)=>{return (element.id === user.id)});
            if(foundAccount){
                if(foundAccount.password === currentPassword){
                    foundAccount.password = newPassword; /* ja altera o objeto dentro do array */
                    sessionStorage.setItem('accountCredentials', JSON.stringify(accountCredentials));
                    resolve({
                        status: 201,
                        message: 'Senha alterada com sucesso.',
                        data: null,
                    })
                }
                else{
                    reject({
                        status: 401,
                        message: 'A senha informada não está correta.',
                        data: null,
                    })
                }
            }
            else{
                reject({
                    status: 404,
                    message: 'Credenciais não encontradas no banco de dados.',
                    data: null,
                })
            }
        }
        else{
            reject({
                status: 404,
                message: 'Banco de dados não encontrado.',
                data: null,
            })
        }
    })
}


export function getProcessById(id:number, user:User): Promise<Response>{
    return new Promise((resolve, reject)=>{
        const sessionData: string | null = sessionStorage.getItem('process');
    
        if(sessionData){
            const allProcess: Process[] = JSON.parse(sessionData);
            const foundProcess: Process | undefined = allProcess.find((element: Process)=>{return (element.id === id)});
            if(foundProcess){
                if(foundProcess.clientId === user.id || foundProcess.attorneyId === user.id){
                    foundProcess.startDate = new Date(foundProcess.startDate); /* convertendo a string de volta para Date */
                    if(foundProcess.endDate){ foundProcess.endDate = new Date(foundProcess.endDate); }
                    resolve({
                        status: 200,
                        message: 'Processo encontrado com sucesso.',
                        data: foundProcess,
                    })
                }
                else{
                    reject({
                        status: 401,
                        message: 'Usuário não tem permissão para visualizar esse processo.',
                        data: null,
                    })
                }
            }
            else{
                reject({
                    status: 404,
                    message: 'Processo não encontrado.',
                    data: null,
                })
            }
        }
        else{
            reject({
                status: 404,
                message: 'Banco de dados não encontrado.',
                data: null,
            })
        }
    })
}


export function registerProcess(process: Process): Promise<Response>{
    return new Promise((resolve, reject)=>{
        const processSessionData: string | null = sessionStorage.getItem('process');
        const usersSessionData: string | null = sessionStorage.getItem('users');
    
        if(processSessionData && usersSessionData){
            const allProcess: Process[] = JSON.parse(processSessionData);
            const allUsers: User[] = JSON.parse(usersSessionData);

            const foundUser: User | undefined = allUsers.find((element: User)=>{return(element.fullName === process.clientFullName)});
            let clientId: number = (foundUser) ? foundUser.id : -1;
            process.clientId = clientId;
            process.id = allProcess[allProcess.length-1].id + 1;
            
            if(clientId === -1){ console.warn('Cliente com nome', process.clientFullName, 'não encontrado.'); }

            let processIdx: number = allProcess.findIndex((process: Process) => process.id === process.id);
            if(processIdx !== -1){
                allProcess[processIdx] = process;
            }
            else{
                allProcess.push(process);
            }
            
            sessionStorage.setItem('process', JSON.stringify(allProcess));
            resolve({
                status: 201,
                message: 'Processo criado com sucesso.',
                data: process
            });
        }
        else{
            reject({
                status: 404,
                message: 'Banco de dados não encontrado',
                data: null
            });
        }
    })
}


function getUserDataFromAccountCredentials(credentials: AccountCredentials){
    const sessionData: string | null = sessionStorage.getItem('users');
    
    if(sessionData){
        const users: User[] = JSON.parse(sessionData);
        const foundUser: User | undefined = users.find((element)=>{return (element.id === credentials.id)});
        if(foundUser){ return foundUser; }
        else{ return undefined }
    }
    else{ return undefined }
}


export function getProcessListByUserId(userId:number): Promise<Response>{
    return new Promise<Response>((resolve, reject)=>{
        const sessionData: string | null = sessionStorage.getItem('process');
        
        if(sessionData){
            const process: Process[] = JSON.parse(sessionData);
            const foundProcess: Process[] = process.filter((element)=>{return (element.clientId === userId || element.attorneyId === userId)});
            
            // convertendo novamente as datas recuperadas da sessionStorage (em formato de string) para um objeto Date
            foundProcess.forEach((element, idx)=>{
                foundProcess[idx] = {
                    ...element, 
                    startDate: new Date(element.startDate),
                    endDate: (element.endDate) ? new Date(element.endDate) : undefined,
                }
            })

            resolve({
                status: 200,
                message: 'Requisição bem sucedida.',
                data: foundProcess,
            });
        }
        else{
            console.error('Processos não encontrados no sessionStorage.')
            reject({
                status: 404,
                message: 'Banco de dados não encontrado.',
                data: null,
            });
        }
    })
}