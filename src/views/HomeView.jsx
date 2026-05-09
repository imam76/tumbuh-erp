import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { paths } from '@/routes/paths'

export function HomeView() {
  const navigate = useNavigate()

  return (
    <section className="mx-auto box-border grid min-h-[calc(100svh-82px)] w-full max-w-5xl content-center px-8 py-20 max-[720px]:min-h-[calc(100svh-122px)] max-[720px]:px-5 max-[720px]:py-14">
      <p className="mb-4 text-sm font-bold uppercase text-sky-700 dark:text-sky-300">
        AmbilAja
      </p>
      <h1 className="mb-6 max-w-3xl text-[56px] font-medium leading-[1.05] text-slate-950 dark:text-slate-100 max-lg:text-4xl">
        Berbagi barang layak pakai jadi lebih mudah.
      </h1>
      <p className="max-w-170 text-xl text-slate-600 dark:text-slate-400 max-[720px]:text-lg">
        Temukan barang gratis di sekitar komunitasmu, atau unggah barang yang
        masih layak agar bisa dipakai orang lain.
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
