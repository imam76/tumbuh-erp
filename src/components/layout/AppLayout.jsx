import { MainNavigation } from '@/components/navigation/MainNavigation'
import { AppRoutes } from '@/routes/AppRoutes'

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-white text-slate-600 dark:bg-slate-950 dark:text-slate-300">
      <MainNavigation />
      <main className="grid flex-1">
        <AppRoutes />
      </main>
    </div>
  )
}
