import { useMemo, useState } from 'react'
import {
  AppstoreOutlined,
  DashboardOutlined,
  HomeOutlined,
  InfoCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { Input, Spin, theme } from 'antd'
import { Link, Outlet, useLocation, useNavigate, useNavigation } from 'react-router'
import { paths } from '@/routes/paths'
import { sideNavigationSections } from '@/utils/sideNavigationItems'

function createLayoutRoutes() {
  return [
    {
      path: paths.home,
      name: 'Home',
      icon: <HomeOutlined />,
    },
    ...sideNavigationSections.map((section) => ({
      path: `/${section.key}`,
      name: section.label,
      icon:
        section.key === 'workspace' ? (
          <DashboardOutlined />
        ) : (
          <AppstoreOutlined />
        ),
      routes: section.children.map((item) => ({
        path: item.path || `/${section.key}/${item.key}`,
        name: item.label,
        disabled: !item.path,
      })),
    })),
  ]
}

const layoutRoutes = createLayoutRoutes()

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const navigation = useNavigation()
  const isRouteLoading = navigation.state !== 'idle'
  const {
    token: { colorBgContainer, colorBgLayout, colorPrimary },
  } = theme.useToken()
  const currentYear = new Date().getFullYear()
  const route = useMemo(
    () => ({
      path: paths.home,
      routes: layoutRoutes,
    }),
    [],
  )

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
      layout="mix"
      location={{ pathname: location.pathname }}
      logo={
        <div
          className="flex h-8 w-8 items-center justify-center rounded-md font-bold text-slate-950"
          style={{ background: colorPrimary }}
        >
          T
        </div>
      }
      menu={{ type: 'group' }}
      menuFooterRender={(props) =>
        props?.collapsed ? undefined : (
          <div className="px-4 pb-4 pt-3 text-center text-xs text-slate-400">
            Operasi ERP Tumbuh
          </div>
        )
      }
      menuItemRender={(item, dom) => {
        if (!item.path || item.disabled) return dom

        return (
          <Link className="text-inherit no-underline" to={item.path}>
            {dom}
          </Link>
        )
      }}
      onCollapse={setCollapsed}
      onMenuHeaderClick={() => navigate(paths.home)}
      pageTitleRender={false}
      route={route}
      siderMenuType="group"
      splitMenus
      title="Tumbuh ERP"
      token={{
        header: {
          colorBgHeader: colorBgContainer,
        },
      }}
      actionsRender={(props) => {
        if (props.isMobile) return []

        return [
          props.layout !== 'side' && globalThis.document?.body.clientWidth > 1180 ? (
            <div
              key="search"
              aria-hidden
              className="flex items-center"
              onMouseDown={(event) => {
                event.preventDefault()
                event.stopPropagation()
              }}
            >
              <Input
                className="mr-3"
                prefix={<SearchOutlined className="text-slate-400" />}
                placeholder="Cari modul"
                variant="borderless"
              />
            </div>
          ) : null,
          <InfoCircleFilled key="info" />,
          <QuestionCircleFilled key="help" />,
        ].filter(Boolean)
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
