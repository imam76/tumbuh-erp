import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
} from '@ant-design/icons'
import { Button, Card } from 'antd'

const availabilityClassMap = {
  tersedia: 'bg-emerald-700 text-white',
  proses: 'bg-sky-700 text-white',
  pending: 'bg-amber-500 text-white',
  selesai: 'bg-slate-500 text-white',
}

const availabilityLabelMap = {
  tersedia: 'TERSEDIA',
  proses: 'PROSES',
  pending: 'PENDING',
  selesai: 'SELESAI',
}

const requestActionMap = {
  process: 'Diproses',
  pending: 'Menunggu',
  completed: 'Selesai',
}

function ProductVisual({ visual }) {
  if (visual === 'chair') {
    return (
      <div className="relative h-full bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="absolute left-1/2 top-8 h-24 w-20 -translate-x-1/2 rounded-t-lg bg-slate-900 shadow-xl" />
        <div className="absolute left-1/2 top-24 h-12 w-28 -translate-x-1/2 rounded-lg bg-slate-800" />
        <div className="absolute left-1/2 top-36 h-16 w-1 -translate-x-1/2 bg-slate-600" />
        <div className="absolute bottom-5 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-slate-500" />
      </div>
    )
  }

  if (visual === 'shelf') {
    return (
      <div className="relative h-full bg-gradient-to-br from-amber-50 to-slate-100">
        <div className="absolute inset-x-12 top-8 h-32 rounded-md border-4 border-amber-700/80 bg-amber-100 shadow-lg">
          <div className="mt-8 border-t-4 border-amber-700/80" />
          <div className="mt-8 border-t-4 border-amber-700/80" />
        </div>
      </div>
    )
  }

  if (visual === 'tableware') {
    return (
      <div className="relative h-full bg-gradient-to-br from-sky-50 to-slate-100">
        <div className="absolute left-12 top-12 size-24 rounded-full border-[10px] border-sky-200 bg-white shadow-md" />
        <div className="absolute right-14 top-16 h-24 w-3 rounded-full bg-slate-400" />
        <div className="absolute right-20 top-16 h-24 w-3 rounded-full bg-slate-500" />
      </div>
    )
  }

  if (visual === 'baby') {
    return (
      <div className="relative h-full bg-gradient-to-br from-rose-50 to-slate-100">
        <div className="absolute left-1/2 top-12 h-24 w-36 -translate-x-1/2 rounded-b-[40px] rounded-t-lg bg-rose-200 shadow-lg" />
        <div className="absolute left-1/2 top-8 h-10 w-28 -translate-x-1/2 rounded-full bg-white shadow" />
      </div>
    )
  }

  if (visual === 'electronics') {
    return (
      <div className="relative h-full bg-gradient-to-br from-sky-50 to-slate-100">
        <div className="absolute left-1/2 top-10 h-24 w-36 -translate-x-1/2 rounded-lg border-8 border-slate-800 bg-sky-100 shadow-lg" />
        <div className="absolute left-1/2 top-36 h-2 w-16 -translate-x-1/2 rounded-full bg-slate-700" />
        <div className="absolute bottom-8 left-1/2 h-3 w-28 -translate-x-1/2 rounded-md bg-slate-300" />
      </div>
    )
  }

  if (visual === 'clothes') {
    return (
      <div className="relative h-full bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="absolute left-1/2 top-8 h-28 w-28 -translate-x-1/2 rounded-t-3xl bg-emerald-200 shadow-lg" />
        <div className="absolute left-[72px] top-12 h-14 w-8 -rotate-12 rounded-full bg-emerald-200" />
        <div className="absolute right-[72px] top-12 h-14 w-8 rotate-12 rounded-full bg-emerald-200" />
      </div>
    )
  }

  return (
    <div className="relative h-full bg-gradient-to-br from-stone-50 to-slate-100">
      <div className="absolute inset-x-8 bottom-14 h-6 rounded-sm bg-amber-200 shadow-lg" />
      <div className="absolute bottom-6 left-12 h-12 w-2 bg-amber-700/50" />
      <div className="absolute bottom-6 right-12 h-12 w-2 bg-amber-700/50" />
    </div>
  )
}

export function ItemListingCard({ item, onRequestItem, onToggleSave }) {
  const actionLabel = item.createdByMe
    ? 'Barang Saya'
    : item.requestStatus
      ? requestActionMap[item.requestStatus]
      : 'Minta Barang'
  const isActionDisabled = Boolean(item.requestStatus || item.createdByMe)

  return (
    <Card
      className="overflow-hidden"
      styles={{ body: { padding: 0 } }}
      variant="outlined"
    >
      <div className="relative h-44 overflow-hidden">
        <ProductVisual visual={item.visual} />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span
            className={`rounded-md px-3 py-1 text-[10px] font-bold ${
              availabilityClassMap[item.availability]
            }`}
          >
            {availabilityLabelMap[item.availability]}
          </span>
          <span className="rounded-md bg-white px-3 py-1 text-[10px] font-bold text-sky-700">
            {item.condition.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-start gap-3">
          <h3 className="m-0 flex-1 text-lg font-bold leading-snug text-slate-950">
            {item.title}
          </h3>
          <Button
            aria-label={`Simpan ${item.title}`}
            icon={
              item.saved ? (
                <HeartFilled className="text-rose-500" />
              ) : (
                <HeartOutlined />
              )
            }
            shape="circle"
            size="middle"
            type="text"
            onClick={() => onToggleSave(item.id)}
          />
        </div>
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <EnvironmentOutlined />
            {item.location}
          </span>
          <span className="flex items-center gap-1">
            <ClockCircleOutlined />
            {item.timeAgo}
          </span>
        </div>
        <Button
          block
          disabled={isActionDisabled}
          type="primary"
          onClick={() => onRequestItem(item.id)}
        >
          {actionLabel}
        </Button>
      </div>
    </Card>
  )
}
