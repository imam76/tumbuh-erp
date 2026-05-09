import { paths } from '@/routes/paths'

export const sideNavigationItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: paths.dashboard,
    icon: 'dashboard',
  },
  {
    key: 'my-listings',
    label: 'My Listings',
    path: paths.myListings,
    icon: 'listings',
  },
  {
    key: 'requests',
    label: 'Requests',
    path: paths.requests,
    icon: 'requests',
  },
  {
    key: 'impact-stats',
    label: 'Impact Stats',
    path: paths.impactStats,
    icon: 'impact',
  },
  {
    key: 'saved-items',
    label: 'Saved Items',
    path: paths.savedItems,
    icon: 'saved',
  },
]

export function findSideNavigationItem(pathname) {
  return sideNavigationItems.find((item) => item.path === pathname)
}
