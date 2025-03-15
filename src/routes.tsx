import { Navigate } from 'react-router'

import LoginPage from './pages/general/LoginPage.tsx'
import ErrorPage from './pages/general/ErrorPage.tsx'
import AccountSettingsPage from './pages/general/AccountSettingsPage.tsx'

import ClientContainerPage from './pages/client/ClientContainerPage.tsx'
import ClientProcessListPage from './pages/client/ClientProcessListPage.tsx'
import ClientProcessViewerPage from './pages/client/ClientProcessViewerPage.tsx'

import AttorneyContainerPage from './pages/attorney/AttorneyContainerPage.tsx'
import AttorneyProcessListPage from './pages/attorney/AttorneyProcessListPage.tsx'
import AttorneyProcessViewerPage from './pages/attorney/AttorneyProcessViewerPage.tsx'
import AttorneyProcessCreationPage from './pages/attorney/AttorneyProcessCreationPage.tsx'


const routes = [
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/minha-conta',
    element: <AccountSettingsPage />,
  },
  {
    path: '/cliente',
    element: <ClientContainerPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/cliente/lista-processos" replace />
      },
      {
        path: '/cliente/lista-processos',
        element: <ClientProcessListPage />
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
  {
    path: '/procurador',
    element: <AttorneyContainerPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/procurador/lista-processos" replace />
      },
      {
        path: '/procurador/lista-processos',
        element: <AttorneyProcessListPage />
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

export default routes;