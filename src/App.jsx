import { useEffect, useMemo, useState } from 'react'
import { Button, Card, ConfigProvider, Result, Statistic, theme } from 'antd'
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router'

const modules = [
  { label: 'Sales', value: '24 order', trend: '+12%' },
  { label: 'Inventory', value: '1.248 item', trend: '98%' },
  { label: 'Finance', value: 'Rp 86,4 jt', trend: '+8%' },
]

const navLinkClass = ({ isActive }) =>
  [
    'rounded-md px-3 py-2 text-slate-600 no-underline transition-colors',
    'hover:bg-violet-100 hover:text-violet-700',
    'dark:text-slate-300 dark:hover:bg-violet-400/15 dark:hover:text-violet-300',
    isActive && 'bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300',
  ]
    .filter(Boolean)
    .join(' ')

function usePrefersDark() {
  const [isDark, setIsDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event) => setIsDark(event.matches)

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  return isDark
}

function App() {
  const isDark = usePrefersDark()
  const antdTheme = useMemo(
    () => ({
      algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        borderRadius: 6,
        colorPrimary: '#7c3aed',
        fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
      },
      components: {
        Button: {
          fontWeight: 700,
        },
        Card: {
          borderRadiusLG: 8,
        },
      },
    }),
    [isDark],
  )

  return (
    <ConfigProvider componentSize="large" theme={antdTheme}>
      <div className="flex min-h-svh flex-col bg-white text-slate-600 dark:bg-slate-950 dark:text-slate-300">
        <header className="flex items-center justify-between gap-6 border-b border-slate-200 px-8 py-5 dark:border-slate-800 max-[720px]:items-start max-[720px]:flex-col max-[720px]:px-5 max-[720px]:py-[18px]">
          <Link
            className="text-lg font-bold text-slate-950 no-underline dark:text-slate-100"
            to="/"
          >
            Tumbuh ERP
          </Link>
          <nav className="flex items-center gap-2" aria-label="Primary navigation">
            <NavLink className={navLinkClass} to="/" end>
              Home
            </NavLink>
            <NavLink className={navLinkClass} to="/dashboard">
              Dashboard
            </NavLink>
          </nav>
        </header>

        <main className="grid flex-1">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </ConfigProvider>
  )
}

function HomePage() {
  const navigate = useNavigate()

  return (
    <section className="mx-auto box-border grid min-h-[calc(100svh-82px)] w-full max-w-5xl content-center px-8 py-20 max-[720px]:min-h-[calc(100svh-122px)] max-[720px]:px-5 max-[720px]:py-14">
      <p className="mb-4 text-sm font-bold uppercase text-violet-700 dark:text-violet-300">
        React Router v7 siap dipakai
      </p>
      <h1 className="mb-6 max-w-3xl text-[56px] font-medium leading-[1.05] text-slate-950 dark:text-slate-100 max-lg:text-4xl">
        Bangun alur ERP dari route yang jelas.
      </h1>
      <p className="max-w-[680px] text-xl text-slate-600 dark:text-slate-400 max-[720px]:text-lg">
        Struktur dasar routing sudah aktif untuk halaman publik, dashboard, dan
        fallback 404. Kamu bisa lanjut menambah module route sesuai kebutuhan
        Tumbuh ERP.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button type="primary" onClick={() => navigate('/dashboard')}>
          Buka Dashboard
        </Button>
        <Button onClick={() => navigate('/missing-page')}>Tes 404</Button>
      </div>
    </section>
  )
}

function DashboardPage() {
  return (
    <section className="mx-auto box-border w-full max-w-5xl self-start px-8 py-20 max-[720px]:px-5 max-[720px]:py-14">
      <div className="mb-8">
        <p className="mb-4 text-sm font-bold uppercase text-violet-700 dark:text-violet-300">
          Dashboard
        </p>
        <h1 className="mb-6 text-[56px] font-medium leading-[1.05] text-slate-950 dark:text-slate-100 max-lg:text-4xl">
          Ringkasan operasi hari ini
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4 max-[720px]:grid-cols-1">
        {modules.map((module) => (
          <Card
            className="text-left"
            key={module.label}
            variant="outlined"
          >
            <Statistic title={module.label} value={module.value} />
            <small className="mt-3 block font-bold text-violet-700 dark:text-violet-300">
              {module.trend}
            </small>
          </Card>
        ))}
      </div>
    </section>
  )
}

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <section className="mx-auto box-border grid min-h-[calc(100svh-82px)] w-full max-w-5xl content-center px-8 py-20 max-[720px]:min-h-[calc(100svh-122px)] max-[720px]:px-5 max-[720px]:py-14">
      <Result
        status="404"
        title="Halaman tidak ditemukan."
        subTitle="Route ini belum tersedia. Kembali ke halaman utama untuk melanjutkan."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Kembali ke Home
          </Button>
        }
      />
    </section>
  )
}

export default App
