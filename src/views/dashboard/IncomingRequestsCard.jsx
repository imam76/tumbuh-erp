import { Avatar, Button, Card, Tag } from 'antd'
import { useI18n } from '@/i18n/useI18n'

const statusColorMap = {
  new: 'red',
  pending: 'gold',
  approved: 'green',
  rejected: 'default',
}

export function IncomingRequestsCard({ requests, onApprove, onReject }) {
  const { t } = useI18n()
  const newRequestCount = requests.filter((request) => request.status === 'new')
    .length

  return (
    <Card className="h-full" variant="outlined">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="m-0 text-lg font-bold text-slate-950">
          {t('dashboard.sections.incomingRequests')}
        </h2>
        {newRequestCount > 0 ? (
          <Tag color="red">
            {newRequestCount} {t('dashboard.requestStatuses.new')}
          </Tag>
        ) : null}
      </div>
      <div className="space-y-3">
        {requests.map((request) => (
          <div
            className="rounded-lg border border-slate-100 bg-slate-50 p-4"
            key={request.id}
          >
            <div className="mb-3 flex items-start gap-3">
              <Avatar className="bg-slate-900 text-xs font-bold" size={34}>
                {request.avatarInitials}
              </Avatar>
              <div className="min-w-0">
                <p className="m-0 font-bold text-slate-900">
                  {request.requester}
                </p>
                <p className="m-0 text-xs text-slate-500">
                  {t('dashboard.labels.requested')}: {request.itemName}
                </p>
              </div>
              <Tag
                className="ml-auto"
                color={statusColorMap[request.status]}
              >
                {t(`dashboard.requestStatuses.${request.status}`)}
              </Tag>
            </div>
            <p className="mb-4 text-sm italic leading-6 text-slate-600">
              "{request.message}"
            </p>
            {['new', 'pending'].includes(request.status) ? (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="middle"
                  type="primary"
                  onClick={() => onApprove(request.id)}
                >
                  {t('dashboard.actions.approve')}
                </Button>
                <Button size="middle" onClick={() => onReject(request.id)}>
                  {t('dashboard.actions.reject')}
                </Button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  )
}
