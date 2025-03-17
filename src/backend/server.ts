import { AccountCredentialType, UserType } from './database';
import { defaultDatabase } from './database'

export type ResponseType = {
    status: 200 | 201 | 401 | 404 | 500,
    message: string,
    data: any,
}


export function simulateNetworkDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, Math.random()*1500));
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


/* GETTERS */
export function tryLogin(_email: string, _password: string): ResponseType{
    const sessionData: string | null = sessionStorage.getItem('accountCredentials');
    
    if(sessionData){
        const accountCredentials: AccountCredentialType[] = JSON.parse(sessionData);
        const foundAccount: AccountCredentialType | undefined = accountCredentials.find((element)=>{return (element.email === _email)});
        if(foundAccount){
            if(foundAccount.password === _password){
                return {
                    status: 200,
                    message: 'Login bem sucedido.',
                    data: '',
                }
            }
            else{
                return {
                    status: 401,
                    message: 'Credenciais não encontradas.',
                    data: '',
                };
            }
        }
        else{
            return {
                status: 401,
                message: 'Credenciais não encontradas.',
                data: '',
            };
        }
    }
    else{
        console.error('AccountCredentials not found on sessionStorage.')
        return {
            status: 404,
            message: 'O banco de dados não foi encontrado.',
            data: '',
        };
    }
}