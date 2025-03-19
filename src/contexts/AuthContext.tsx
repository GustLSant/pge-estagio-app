import { PropsWithChildren, useState } from "react";
import { createContext } from "react";
import { User } from "../types";

export type AuthContextType = {
    user: User | undefined,
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


/* recuperando os dados da sessao do ultimo usuario que fez login (para casos de refresh na pagina ou alteracao manual da url) */
const sessionData: string | null = sessionStorage.getItem('currentUser');
let userFromSessionStorage: User | undefined;
if(sessionData){
    userFromSessionStorage = JSON.parse(sessionData);
    if(userFromSessionStorage){
        userFromSessionStorage.registerDate = new Date(userFromSessionStorage.registerDate); /* convertendo a string de volta para Date */
    }
}


export default function AuthProvider({ children }:PropsWithChildren){
    const [user, setUser] = useState<User | undefined>(userFromSessionStorage);

    return(
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}