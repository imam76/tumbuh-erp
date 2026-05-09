import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { useI18n } from '@/i18n/useI18n'
import { paths } from '@/routes/paths'

export function HomeView() {
  const navigate = useNavigate()
  const { t } = useI18n()

  return (
    <section className="mx-auto box-border grid min-h-[calc(100svh-82px)] w-full max-w-5xl content-center px-8 py-20 max-[720px]:min-h-[calc(100svh-122px)] max-[720px]:px-5 max-[720px]:py-14">
      <p className="mb-4 text-sm font-bold uppercase text-sky-700 dark:text-sky-300">
        {t('home.eyebrow')}
      </p>
      <h1 className="mb-6 max-w-3xl text-[56px] font-medium leading-[1.05] text-slate-950 dark:text-slate-100 max-lg:text-4xl">
        {t('home.title')}
      </h1>
      <p className="max-w-170 text-xl text-slate-600 dark:text-slate-400 max-[720px]:text-lg">
        {t('home.description')}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button type="primary" onClick={() => navigate(paths.dashboard)}>
          {t('home.openDashboard')}
        </Button>
        <Button onClick={() => navigate(paths.notFoundTest)}>
          {t('home.test404')}
        </Button>
      </div>
    </section>
  )
}
