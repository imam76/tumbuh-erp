import {
  GiftOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Card } from 'antd'

const iconMap = {
  gift: <GiftOutlined />,
  hands: <TeamOutlined />,
  leaf: <SafetyCertificateOutlined />,
}

const toneClassMap = {
  green: 'bg-emerald-100 text-emerald-700',
  blue: 'bg-sky-100 text-sky-700',
  amber: 'bg-amber-100 text-amber-700',
}

export function CommunityImpactCard({ stats }) {
  return (
    <Card className="h-full" variant="outlined">
      <h2 className="mb-5 text-lg font-bold text-slate-950">
        Community Impact
      </h2>
      <div className="space-y-4">
        {stats.map((item) => (
          <div
            className="flex items-center gap-4 rounded-lg bg-slate-50 px-4 py-3"
            key={item.key}
          >
            <span
              className={`grid size-10 place-items-center rounded-md text-xl ${
                toneClassMap[item.tone]
              }`}
            >
              {iconMap[item.icon]}
            </span>
            <span>
              <strong className="block text-xl leading-none text-slate-950">
                {item.value}
              </strong>
              <small className="text-xs font-medium text-slate-500">
                {item.label}
              </small>
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
