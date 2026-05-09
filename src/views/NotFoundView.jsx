import { Button, Result } from 'antd'
import { useNavigate } from 'react-router'
import { useI18n } from '@/i18n/useI18n'
import { paths } from '@/routes/paths'

export function NotFoundView() {
  const navigate = useNavigate()
  const { t } = useI18n()

  return (
    <section className="mx-auto box-border grid min-h-[calc(100svh-82px)] w-full max-w-5xl content-center px-8 py-20 max-[720px]:min-h-[calc(100svh-122px)] max-[720px]:px-5 max-[720px]:py-14">
      <Result
        status="404"
        title={t('notFound.title')}
        subTitle={t('notFound.subtitle')}
        extra={
          <Button type="primary" onClick={() => navigate(paths.dashboard)}>
            {t('notFound.backToDashboard')}
          </Button>
        }
      />
    </section>
  )
}
