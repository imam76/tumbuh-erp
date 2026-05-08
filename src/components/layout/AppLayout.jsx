import { Spin } from 'antd'
import { Outlet, useNavigation } from 'react-router'
import { MainNavigation } from '@/components/navigation/MainNavigation'

export function AppLayout() {
  const navigation = useNavigation()
  const isRouteLoading = navigation.state !== 'idle'

  return (
    <div className="flex min-h-svh flex-col bg-white text-slate-600 dark:bg-slate-950 dark:text-slate-300">
      <MainNavigation />
      <main className="relative grid flex-1">
        <Spin
          fullscreen
          spinning={isRouteLoading}
          tip="Memuat halaman"
          delay={150}
        />
        <Outlet />
      </main>
    </div>
  )
}
