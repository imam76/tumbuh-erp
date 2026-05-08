import { paths } from '@/routes/paths'

export const sideNavigationSections = [
  {
    key: 'workspace',
    label: 'Workspace',
    children: [
      {
        key: 'dashboard',
        label: 'Dashboard',
        path: paths.dashboard,
      },
    ],
  },
  {
    key: 'erp-modules',
    label: 'Modul ERP',
    children: [
      {
        key: 'sales',
        label: 'Sales',
      },
      {
        key: 'inventory',
        label: 'Inventory',
      },
      {
        key: 'finance',
        label: 'Finance',
      },
    ],
  },
]

export function findSideNavigationItem(pathname) {
  return sideNavigationSections
    .flatMap((section) => section.children)
    .find((item) => item.path === pathname)
}
