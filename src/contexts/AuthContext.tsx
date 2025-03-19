import { PropsWithChildren, useState } from "react";
import { createContext } from "react";
import { User } from "../types";
import { getUserDataFromSessionStorage } from "../backend/server";


export type AuthContextType = {
    user: User | undefined,
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


/* recuperando os dados da sessao do ultimo usuario que fez login (para casos de refresh na pagina ou alteracao manual da url) */
const userFromSessionStorage: User | undefined = getUserDataFromSessionStorage();


export default function AuthProvider({ children }:PropsWithChildren){
    const [user, setUser] = useState<User | undefined>(userFromSessionStorage);

    return(
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}