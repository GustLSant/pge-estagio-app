import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserRole } from "../types";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";

type ProtectedRouteProps = {
  allowedRoles: UserRole[],
};


export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps){
  const authContext: AuthContextType | undefined = useContext(AuthContext);

  // usuario nao está logado
  if(!authContext){
    console.error('AuthContext is undefined: ', authContext);
    console.log('Redirecting user to login page...')
    return <Navigate to="/" replace />;
  }

  if(authContext.user){
    if(!allowedRoles.includes(authContext.user.role)){ // usuario nao tem permissao para acessar essa pagina
        console.error('User does not have permission to access this route.');
        return <Navigate to="/minha-conta" replace />;
    }
  }
  else{
    console.error('User from AuthContext is undefined: ', authContext);
    console.log('Redirecting user to login page...')
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};