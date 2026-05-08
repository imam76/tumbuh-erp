import { createBrowserRouter, Navigate } from 'react-router'
import App from '@/App'
import { lazyRoute } from '@/routes/lazyRoute'
import { paths } from '@/routes/paths'

export const router = createBrowserRouter([
  {
    path: paths.home,
    element: <App />,
    children: [
      {
        index: true,
        ...lazyRoute(() => import('@/views/HomeView'), 'HomeView'),
      },
      {
        path: 'dashboard',
        ...lazyRoute(() => import('@/views/DashboardView'), 'DashboardView'),
      },
      {
        path: 'home',
        element: <Navigate to={paths.home} replace />,
      },
      {
        path: '*',
        ...lazyRoute(() => import('@/views/NotFoundView'), 'NotFoundView'),
      },
    ],
  },
])
