import { Navigate } from 'react-router';

import AppLayout from './pages/general/AppLayout.tsx';
import LoginPage from './pages/general/LoginPage.tsx';
import ErrorPage from './pages/general/ErrorPage/ErrorPage.tsx';
import MyAccountPage from './pages/general/MyAccountPage.tsx';

import ProcessListPage from './pages/general/ProcessListPage.tsx';

import ClientProcessViewerPage from './pages/client/ClientProcessViewerPage.tsx';

import AttorneyProcessViewerPage from './pages/attorney/AttorneyProcessViewerPage.tsx';
import AttorneyProcessCreationPage from './pages/attorney/AttorneyProcessCreationPage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';


const routes = [
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    element: <ProtectedRoute allowedRoles={['client', 'attorney']} />, /* PAGINAS ACESSIVEIS SOMENTE POR USUARIOS LOGADOS */
    children: [
      {
        path: '/minha-conta',
        element: <AppLayout />,
        children:[
          {
            path: '/minha-conta',
            element: <MyAccountPage />,
          }
        ]
      },
    ]
  },
  {
    element: <ProtectedRoute allowedRoles={['client']} />, /* PAGINAS ACESSIVEIS SOMENTE POR CLIENTES */
    children:[
      {
        path: '/cliente',
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/cliente/lista-processos" replace />
          },
          {
            path: '/cliente/lista-processos',
            element: <ProcessListPage />
          },
          {
            path: '/cliente/visualizar-processo',
            element: <Navigate to="/cliente/lista-processos" replace /> /* sem o id deve retornar para a pagina de listagem */
          },
          {
            path: '/cliente/visualizar-processo/:id',
            element: <ClientProcessViewerPage />
          },
        ]
      },
    ]
  },
  {
    element: <ProtectedRoute allowedRoles={['attorney']} />, /* PAGINAS ACESSIVEIS SOMENTE POR PROCURADORES */
    children:[
      {
        path: '/procurador',
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/procurador/lista-processos" replace />
          },
          {
            path: '/procurador/lista-processos',
            element: <ProcessListPage />
          },
          {
            path: '/procurador/visualizar-processo',
            element: <Navigate to="/procurador/lista-processos" replace /> /* sem o id deve retornar para a pagina de listagem */
          },
          {
            path: '/procurador/visualizar-processo/:id',
            element: <AttorneyProcessViewerPage />
          },
          {
            path: '/procurador/criar-processo',
            element: <AttorneyProcessCreationPage />
          },
        ]
      },
    ]
  }
]

export default routes;