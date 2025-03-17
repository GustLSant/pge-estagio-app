import { defaultDatabase } from './database';
import { AccountCredentials, User } from '../types';

export type Response = {
    status: 200 | 201 | 401 | 404 | 500,
    message: string,
    data: any,
}


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
                        resolve({
                            status: 200,
                            message: 'Login bem sucedido.',
                            data: userData,
                        });
                    }
                    else{
                        console.error('User related to these credentials was not found on sessionStorage.')
                        reject({
                            status: 404,
                            message: 'Usuário com o id fornecido não foi encontrado.',
                            data: '',
                        });
                    }
                }
                else{
                    reject({
                        status: 401,
                        message: 'Credenciais não encontradas.',
                        data: '',
                    });
                }
            }
            else{
                reject({
                    status: 401,
                    message: 'Credenciais não encontradas.',
                    data: '',
                });
            }
        }
        else{
            console.error('AccountCredentials not found on sessionStorage.')
            reject({
                status: 404,
                message: 'Banco de dados não encontrado.',
                data: '',
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