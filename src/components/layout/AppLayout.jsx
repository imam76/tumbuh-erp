import { paths } from '@/routes/paths'
import { sideNavigationItems } from '@/utils/sideNavigationItems'
import {
  BarChartOutlined,
  BellOutlined,
  DashboardOutlined,
  FileTextOutlined,
  GiftOutlined,
  GlobalOutlined,
  HeartOutlined,
  InboxOutlined,
  MessageOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { Avatar, Badge, Button, Input, Select, Spin, Tooltip, theme } from 'antd'
import { useMemo, useState } from 'react'
import { useI18n } from '@/i18n/useI18n'
import { supportedLanguages } from '@/i18n/translations'
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
  useSearchParams,
} from 'react-router'

const sidebarIconMap = {
  dashboard: <DashboardOutlined />,
  listings: <FileTextOutlined />,
  requests: <InboxOutlined />,
  impact: <BarChartOutlined />,
  saved: <HeartOutlined />,
}

const topNavigationItems = [
  { key: 'browse', labelKey: 'app.topNav.browse' },
  { key: 'giveAway', labelKey: 'app.topNav.giveAway' },
  { key: 'community', labelKey: 'app.topNav.community' },
  { key: 'map', labelKey: 'app.topNav.map' },
]

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const { language, setLanguage, t } = useI18n()
  const location = useLocation()
  const navigate = useNavigate()
  const navigation = useNavigation()
  const [searchParams] = useSearchParams()
  const isRouteLoading = navigation.state !== 'idle'
  const {
    token: { colorBgContainer, colorBgLayout },
  } = theme.useToken()
  const currentYear = new Date().getFullYear()
  const menuList = useMemo(
    () =>
      sideNavigationItems.map((item) => ({
        name: t(item.labelKey),
        path: item.path,
        icon: sidebarIconMap[item.icon],
      })),
    [t],
  )
  const languageOptions = useMemo(
    () =>
      supportedLanguages.map((item) => ({
        label: item.shortLabel,
        title: t(item.labelKey),
        value: item.code,
      })),
    [t],
  )

  const navigateToDashboardWithParams = (updates) => {
    const nextParams = new URLSearchParams(
      location.pathname === paths.dashboard ? location.search : '',
    )

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        nextParams.set(key, value)
      } else {
        nextParams.delete(key)
      }
    })

    navigate({
      pathname: paths.dashboard,
      search: nextParams.toString() ? `?${nextParams.toString()}` : '',
    })
  }

  const handleSearchChange = (event) => {
    const value = event.target.value

    navigateToDashboardWithParams({ q: value.trim(), action: '' })
  }

  const handleTopNavigationClick = (itemKey) => {
    if (itemKey === 'giveAway') {
      navigateToDashboardWithParams({ action: 'upload' })
      return
    }

    if (itemKey === 'community') {
      navigate(paths.impactStats)
      return
    }

    if (itemKey === 'map') {
      navigateToDashboardWithParams({ action: 'location' })
      return
    }

    navigate(paths.dashboard)
  }

  return (
    <ProLayout
      className="min-h-svh"
      collapsed={collapsed}
      contentStyle={{ minHeight: '100svh', backgroundColor: colorBgLayout }}
      fixSiderbar
      fixedHeader
      footerRender={() => (
        <div className="py-4 text-center text-sm text-slate-500">
          AmbilAja ©{currentYear}
        </div>
      )}
      layout="side"
      location={{ pathname: location.pathname }}
      logo={false}
      title={false}
      headerTitleRender={() => (
        <Link
          className="flex min-w-33 items-center gap-2 text-inherit no-underline"
          to={paths.dashboard}
        >
          <span className="grid size-8 place-items-center rounded-md border border-sky-100 bg-white text-sky-700 shadow-sm">
            <GiftOutlined />
          </span>
          <span className="text-xl font-bold text-sky-700">AmbilAja</span>
        </Link>
      )}
      headerContentRender={() => (
        <div className="flex min-w-0 flex-1 items-center gap-8">
          <Input
            allowClear
            className="max-w-[320px] rounded-xl bg-slate-50"
            placeholder={t('app.searchPlaceholder')}
            prefix={<SearchOutlined className="text-slate-400" />}
            value={searchParams.get('q') || ''}
            variant="filled"
            onChange={handleSearchChange}
          />
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 xl:flex">
            {topNavigationItems.map((item) => (
              <button
                className={`border-0 bg-transparent px-0 py-4 font-[inherit] ${
                  item.key === 'browse' && location.pathname === paths.dashboard
                    ? 'border-b-2 border-sky-700 text-sky-700'
                    : 'text-slate-600'
                }`}
                key={item.key}
                type="button"
                onClick={() => handleTopNavigationClick(item.key)}
              >
                {t(item.labelKey)}
              </button>
            ))}
          </nav>
        </div>
      )}
      actionsRender={() => [
        <Tooltip key="language" title={t('app.language.label')}>
          <Select
            aria-label={t('app.language.label')}
            className="w-20"
            options={languageOptions}
            prefix={<GlobalOutlined />}
            size="middle"
            value={language}
            onChange={setLanguage}
          />
        </Tooltip>,
        <Tooltip key="notifications" title={t('app.actions.notifications')}>
          <Badge dot>
            <Button
              aria-label={t('app.actions.notifications')}
              icon={<BellOutlined />}
              shape="circle"
              size="middle"
              type="text"
            />
          </Badge>
        </Tooltip>,
        <Tooltip key="messages" title={t('app.actions.messages')}>
          <Button
            aria-label={t('app.actions.messages')}
            icon={<MessageOutlined />}
            shape="circle"
            size="middle"
            type="text"
          />
        </Tooltip>,
        <Tooltip key="settings" title={t('app.actions.settings')}>
          <Button
            aria-label={t('app.actions.settings')}
            icon={<SettingOutlined />}
            shape="circle"
            size="middle"
            type="text"
          />
        </Tooltip>,
        <Avatar
          className="bg-slate-900 text-xs font-bold"
          key="avatar"
          size={34}
        >
          RA
        </Avatar>,
      ]}
      menu={{ type: 'group' }}
      menuHeaderRender={false}
      menuExtraRender={(props) =>
        props.collapsed ? null : (
          <div className="px-5 pb-4 pt-2">
            <p className="mb-1 text-lg font-bold text-sky-700">
              {t('app.menuExtra.title')}
            </p>
            <p className="m-0 text-sm text-slate-500">
              {t('app.menuExtra.subtitle')}
            </p>
          </div>
        )
      }
      menuItemRender={(item, dom) => (
        <Link className="text-inherit no-underline" to={item.path || paths.home}>
          {dom}
        </Link>
      )}
      collapsedButtonRender={false}
      onCollapse={setCollapsed}
      onMenuHeaderClick={() => navigate(paths.dashboard)}
      route={{ path: paths.home, routes: menuList }}
      suppressSiderWhenMenuEmpty={false}
      siderMenuType="group"
      token={{
        header: {
          colorBgHeader: colorBgContainer,
        },
        sider: {
          colorMenuBackground: colorBgContainer,
        },
      }}
    >
      <PageContainer ghost header={{ title: false }} className="relative">
        <Spin
          fullscreen
          spinning={isRouteLoading}
          description={t('app.loadingPage')}
          delay={150}
        />
        <Outlet />
      </PageContainer>
    </ProLayout>
  )
}
