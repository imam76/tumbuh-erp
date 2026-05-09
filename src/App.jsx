import { useMemo } from 'react'
import { App as AntdApp, ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import idID from 'antd/locale/id_ID'
import { AppLayout } from '@/components/layout/AppLayout'
import { usePrefersDark } from '@/hooks/usePrefersDark'
import { I18nProvider } from '@/i18n/I18nProvider'
import { useI18n } from '@/i18n/useI18n'
import { createAntdTheme } from '@/utils/createAntdTheme'

const antdLocaleMap = {
  en: enUS,
  id: idID,
}

function AppProviders() {
  const isDark = usePrefersDark()
  const { language } = useI18n()
  const antdTheme = useMemo(() => createAntdTheme(isDark), [isDark])

  return (
    <ConfigProvider
      componentSize="large"
      locale={antdLocaleMap[language]}
      theme={antdTheme}
    >
      <AntdApp>
        <AppLayout />
      </AntdApp>
    </ConfigProvider>
  )
}

function App() {
  return (
    <I18nProvider>
      <AppProviders />
    </I18nProvider>
  )
}

export default App
