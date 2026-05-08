import { createBrowserRouter, Navigate } from 'react-router'
import App from '@/App'
import { DashboardView } from '@/views/DashboardView'
import { HomeView } from '@/views/HomeView'
import { NotFoundView } from '@/views/NotFoundView'
import { paths } from '@/routes/paths'

export const router = createBrowserRouter([
  {
    path: paths.home,
    element: <App />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: 'dashboard',
        element: <DashboardView />,
      },
      {
        path: 'home',
        element: <Navigate to={paths.home} replace />,
      },
      {
        path: '*',
        element: <NotFoundView />,
      },
    ],
  },
])
