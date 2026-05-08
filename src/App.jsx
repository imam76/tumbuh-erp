import { Link, NavLink, Navigate, Route, Routes } from 'react-router'

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

function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between gap-6 border-b border-slate-200 px-8 py-5 dark:border-slate-700 max-[720px]:items-start max-[720px]:flex-col max-[720px]:px-5 max-[720px]:py-[18px]">
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
  )
}

function HomePage() {
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
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-violet-700 px-[18px] font-bold text-white no-underline transition-colors hover:bg-violet-800 dark:bg-violet-500 dark:hover:bg-violet-400"
          to="/dashboard"
        >
          Buka Dashboard
        </Link>
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-stone-100/50 px-[18px] font-bold text-slate-950 no-underline transition-colors hover:bg-stone-200/70 dark:border-slate-700 dark:bg-slate-700/50 dark:text-slate-100 dark:hover:bg-slate-700"
          to="/missing-page"
        >
          Tes 404
        </Link>
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
          <article
            className="grid gap-3 rounded-lg border border-slate-200 bg-white p-6 text-left dark:border-slate-700 dark:bg-slate-800"
            key={module.label}
          >
            <span className="text-slate-600 dark:text-slate-400">{module.label}</span>
            <strong className="text-[28px] text-slate-950 dark:text-slate-100">
              {module.value}
            </strong>
            <small className="font-bold text-violet-700 dark:text-violet-300">
              {module.trend}
            </small>
          </article>
        ))}
      </div>
    </section>
  )
}

function NotFoundPage() {
  return (
    <section className="mx-auto box-border grid min-h-[calc(100svh-82px)] w-full max-w-5xl content-center px-8 py-20 max-[720px]:min-h-[calc(100svh-122px)] max-[720px]:px-5 max-[720px]:py-14">
      <p className="mb-4 text-sm font-bold uppercase text-violet-700 dark:text-violet-300">
        404
      </p>
      <h1 className="mb-6 max-w-3xl text-[56px] font-medium leading-[1.05] text-slate-950 dark:text-slate-100 max-lg:text-4xl">
        Halaman tidak ditemukan.
      </h1>
      <p className="max-w-[680px] text-xl text-slate-600 dark:text-slate-400 max-[720px]:text-lg">
        Route ini belum tersedia. Kembali ke halaman utama untuk melanjutkan.
      </p>
      <Link
        className="mt-8 inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-violet-700 px-[18px] font-bold text-white no-underline transition-colors hover:bg-violet-800 dark:bg-violet-500 dark:hover:bg-violet-400"
        to="/"
      >
        Kembali ke Home
      </Link>
    </section>
  )
}

export default App
