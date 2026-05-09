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
        element: <Navigate to={paths.dashboard} replace />,
      },
      {
        path: 'dashboard',
        ...lazyRoute(() => import('@/views/DashboardView'), 'DashboardView'),
      },
      {
        path: 'my-listings',
        ...lazyRoute(() => import('@/views/MyListings'), 'MyListings'),
      },
      {
        path: 'my-listings/new',
        ...lazyRoute(
          () => import('@/views/CreateListingView'),
          'CreateListingView',
        ),
      },
      {
        path: 'requests',
        ...lazyRoute(
          () => import('@/views/SectionPlaceholderView'),
          'SectionPlaceholderView',
        ),
      },
      {
        path: 'impact-stats',
        ...lazyRoute(
          () => import('@/views/SectionPlaceholderView'),
          'SectionPlaceholderView',
        ),
      },
      {
        path: 'saved-items',
        ...lazyRoute(
          () => import('@/views/SectionPlaceholderView'),
          'SectionPlaceholderView',
        ),
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
