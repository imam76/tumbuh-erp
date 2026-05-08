import { Menu } from 'antd'
import { Link, useLocation } from 'react-router'
import {
  findSideNavigationItem,
  sideNavigationSections,
} from '@/utils/sideNavigationItems'

function createMenuItems(sections) {
  return sections.map((section) => ({
    key: section.key,
    label: section.label,
    children: section.children.map((item) => ({
      key: item.key,
      disabled: !item.path,
      label: item.path ? (
        <Link className="text-inherit no-underline" to={item.path}>
          {item.label}
        </Link>
      ) : (
        item.label
      ),
    })),
  }))
}

const menuItems = createMenuItems(sideNavigationSections)
const defaultOpenKeys = sideNavigationSections.map((section) => section.key)

export function SideNavigation({ collapsed }) {
  const location = useLocation()
  const selectedItem = findSideNavigationItem(location.pathname)

  return (
    <div className="py-5">
      <div className="mx-auto mb-6 flex h-9 w-[calc(100%-32px)] items-center justify-center rounded-md bg-emerald-400 font-bold text-slate-950">
        {collapsed ? 'T' : 'Tumbuh'}
      </div>
      {!collapsed && (
        <p className="mb-3 px-6 text-xs font-bold uppercase tracking-normal text-slate-400">
          Menu
        </p>
      )}
      <Menu
        defaultOpenKeys={defaultOpenKeys}
        inlineCollapsed={collapsed}
        items={menuItems}
        mode="inline"
        selectedKeys={selectedItem ? [selectedItem.key] : []}
        theme="dark"
      />
    </div>
  )
}
