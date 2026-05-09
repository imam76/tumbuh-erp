import { Button, Result } from 'antd'
import { useLocation, useNavigate } from 'react-router'
import { useI18n } from '@/i18n/useI18n'
import { paths } from '@/routes/paths'
import { findSideNavigationItem } from '@/utils/sideNavigationItems'

export function SectionPlaceholderView() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useI18n()
  const currentItem = findSideNavigationItem(location.pathname)
  const sectionName = currentItem?.labelKey
    ? t(currentItem.labelKey)
    : t('placeholder.fallbackSection')

  return (
    <section className="mx-auto box-border grid min-h-[calc(100svh-82px)] w-full max-w-4xl content-center px-8 py-20 max-md:px-5">
      <Result
        status="info"
        title={t('placeholder.title', { sectionName })}
        subTitle={t('placeholder.subtitle')}
        extra={
          <Button type="primary" onClick={() => navigate(paths.dashboard)}>
            {t('placeholder.backToDashboard')}
          </Button>
        }
      />
    </section>
  )
}
