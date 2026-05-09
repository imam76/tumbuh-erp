import { Card, Tag } from 'antd'

const toneClassMap = {
  blue: 'bg-sky-50 text-sky-700',
  green: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
}

const requestStatusMap = {
  pending: {
    color: 'gold',
    label: 'PENDING',
  },
  process: {
    color: 'blue',
    label: 'PROSES',
  },
  completed: {
    color: 'green',
    label: 'SELESAI',
  },
}

export function MyActivityCard({ activity }) {
  const primaryStatuses = activity.statuses.filter((status) =>
    ['process', 'completed'].includes(status.key),
  )
  const latestRequestStatus =
    requestStatusMap[activity.latestRequest.status] || requestStatusMap.pending

  return (
    <Card className="h-full" variant="outlined">
      <h2 className="mb-5 text-lg font-bold text-slate-950">Aktivitas Saya</h2>
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-800">Barang Saya</span>
        <span className="text-xs font-bold text-sky-700">
          {activity.listingsTotal} Total
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
            Permintaan Saya
          </p>
          <p className="m-0 text-sm text-slate-600">
            {activity.latestRequest.itemName}
          </p>
        </div>
        <div className="text-right">
          <p className="mb-2 text-xs font-bold text-sky-700">
            {activity.requestTotal} Aktif
          </p>
          <Tag color={latestRequestStatus.color}>
            {latestRequestStatus.label}
          </Tag>
        </div>
      </div>
    </Card>
  )
}
