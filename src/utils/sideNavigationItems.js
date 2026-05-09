import { paths } from '@/routes/paths'

export const sideNavigationItems = [
  {
    key: 'dashboard',
    labelKey: 'app.sidebar.dashboard',
    path: paths.dashboard,
    icon: 'dashboard',
  },
  {
    key: 'my-listings',
    labelKey: 'app.sidebar.myListings',
    path: paths.myListings,
    icon: 'listings',
  },
  {
    key: 'requests',
    labelKey: 'app.sidebar.requests',
    path: paths.requests,
    icon: 'requests',
  },
  {
    key: 'impact-stats',
    labelKey: 'app.sidebar.impactStats',
    path: paths.impactStats,
    icon: 'impact',
  },
  {
    key: 'saved-items',
    labelKey: 'app.sidebar.savedItems',
    path: paths.savedItems,
    icon: 'saved',
  },
]

export function findSideNavigationItem(pathname) {
  return sideNavigationItems.find((item) => item.path === pathname)
}
