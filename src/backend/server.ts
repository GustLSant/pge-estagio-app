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
                    console.log('array de dados de contas alterado: ', accountCredentials);
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
                    endDate: new Date(element.endDate),
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