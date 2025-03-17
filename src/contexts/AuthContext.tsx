import { PropsWithChildren, useState } from "react";
import { createContext } from "react";
import { User } from "../types";

type AuthContextType = {
    user: User | undefined,
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export default function AuthProvider({ children }:PropsWithChildren){
    const [user, setUser] = useState<User | undefined>(undefined);

    return(
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}