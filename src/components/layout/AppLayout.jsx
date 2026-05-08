import { paths } from '@/routes/paths'
import {
  DashboardOutlined,
  HomeOutlined
} from '@ant-design/icons'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { Spin, theme } from 'antd'
import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate, useNavigation } from 'react-router'


const menuList = [
  {
    name: 'Beranda',
    path: paths.home,
    icon: <HomeOutlined />,
  },
  {
    name: 'Dashboard',
    path: paths.dashboard,
    icon: <DashboardOutlined />,
  },
]

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const navigation = useNavigation()
  const isRouteLoading = navigation.state !== 'idle'
  const {
    token: { colorBgContainer, colorBgLayout },
  } = theme.useToken()
  const currentYear = new Date().getFullYear()

  return (
    <ProLayout
      className="min-h-svh"
      collapsed={collapsed}
      contentStyle={{ background: colorBgLayout, minHeight: '100svh' }}
      fixSiderbar
      fixedHeader
      footerRender={() => (
        <div className="py-4 text-center text-sm text-slate-500">
          Tumbuh ERP ©{currentYear}
        </div>
      )}
      layout="side"
      location={{ pathname: location.pathname }}
      headerTitleRender={(logo, title) => (
        <div className="flex items-center gap-2">
          {logo}
          {title}
        </div>
      )}
      menu={{ type: 'group' }}
      menuItemRender={(item, dom) => (
        <Link className="text-inherit no-underline" to={item.path || paths.home}>
          {dom}
        </Link>
      )}
      onCollapse={setCollapsed}
      onMenuHeaderClick={() => navigate(paths.home)}
      route={{ path: paths.home, routes: menuList }}
      suppressSiderWhenMenuEmpty={false}
      siderMenuType="group"
      token={{
        header: {
          colorBgHeader: colorBgContainer,
        },
      }}
    >
      <PageContainer ghost header={{ title: false }} className="relative">
        <Spin
          fullscreen
          spinning={isRouteLoading}
          description="Memuat halaman"
          delay={150}
        />
        <Outlet />
      </PageContainer>
    </ProLayout>
  )
}
