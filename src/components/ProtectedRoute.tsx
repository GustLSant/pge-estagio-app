import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserRole } from "../types";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";

type ProtectedRouteProps = {
  allowedRoles: UserRole[],
};


export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps){
  const authContext: AuthContextType | undefined = useContext(AuthContext);

  if(authContext?.user){
    if(!allowedRoles.includes(authContext.user.role)){ // usuario nao tem permissao para acessar essa pagina
        console.error('O usuário não tem permissão para acessar essa rota.');
        console.log('Redirecionando para a página inicial...')
        if(authContext.user.role === 'client'){ return <Navigate to='/cliente/lista-processos' replace />; }
        else{ return <Navigate to='/procurador/lista-processos' replace />; }
    }
  }
  else{
    console.error('A sessão do usuário não foi encontrada: ', authContext);
    console.log('Redirecionando para a página de login...');
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};