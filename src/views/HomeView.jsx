import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { paths } from '@/routes/paths'

export function HomeView() {
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
        <Button type="primary" onClick={() => navigate(paths.dashboard)}>
          Buka Dashboard
        </Button>
        <Button onClick={() => navigate(paths.notFoundTest)}>Tes 404</Button>
      </div>
    </section>
  )
}
