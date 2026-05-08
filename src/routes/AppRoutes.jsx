import { Navigate, Route, Routes } from 'react-router'
import { DashboardView } from '@/views/DashboardView'
import { HomeView } from '@/views/HomeView'
import { NotFoundView } from '@/views/NotFoundView'
import { paths } from '@/routes/paths'

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<HomeView />} />
      <Route path="dashboard" element={<DashboardView />} />
      <Route path="home" element={<Navigate to={paths.home} replace />} />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  )
}
