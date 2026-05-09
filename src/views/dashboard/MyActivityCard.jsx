import { Card, Tag } from 'antd'
import { useI18n } from '@/i18n/useI18n'

const toneClassMap = {
  blue: 'bg-sky-50 text-sky-700',
  green: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
}

const requestStatusColorMap = {
  pending: {
    color: 'gold',
  },
  process: {
    color: 'blue',
  },
  completed: {
    color: 'green',
  },
}

export function MyActivityCard({ activity }) {
  const { t } = useI18n()
  const primaryStatuses = activity.statuses.filter((status) =>
    ['process', 'completed'].includes(status.key),
  )
  const latestRequestStatus =
    requestStatusColorMap[activity.latestRequest.status] ||
    requestStatusColorMap.pending

  return (
    <Card className="h-full" variant="outlined">
      <h2 className="mb-5 text-lg font-bold text-slate-950">
        {t('dashboard.sections.myActivity')}
      </h2>
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-800">
          {t('dashboard.labels.myItems')}
        </span>
        <span className="text-xs font-bold text-sky-700">
          {activity.listingsTotal} {t('dashboard.labels.total')}
        </span>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3">
        {primaryStatuses.map((status) => (
          <div
            className={`rounded-lg px-4 py-3 text-center ${
              toneClassMap[status.tone]
            }`}
            key={status.key}
          >
            <strong className="block text-lg leading-none">
              {status.value}
            </strong>
            <small className="text-[10px] font-bold uppercase">
              {status.label}
            </small>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="mb-2 text-sm font-bold text-slate-800">
            {t('dashboard.labels.myRequests')}
          </p>
          <p className="m-0 text-sm text-slate-600">
            {activity.latestRequest.itemName}
          </p>
        </div>
        <div className="text-right">
          <p className="mb-2 text-xs font-bold text-sky-700">
            {activity.requestTotal} {t('dashboard.labels.active')}
          </p>
          <Tag color={latestRequestStatus.color}>
            {t(`dashboard.requestActions.${activity.latestRequest.status}`)}
          </Tag>
        </div>
      </div>
    </Card>
  )
}
