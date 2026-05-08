import { Card, Statistic } from 'antd'
import { dashboardModules } from '@/utils/dashboardModules'

export function DashboardView() {
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
        {dashboardModules.map((module) => (
          <Card className="text-left" key={module.label} variant="outlined">
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
