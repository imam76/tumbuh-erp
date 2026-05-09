import { useMemo } from 'react'
import { App as AntdApp, ConfigProvider } from 'antd'
import { AppLayout } from '@/components/layout/AppLayout'
import { usePrefersDark } from '@/hooks/usePrefersDark'
import { createAntdTheme } from '@/utils/createAntdTheme'

function App() {
  const isDark = usePrefersDark()
  const antdTheme = useMemo(() => createAntdTheme(isDark), [isDark])

  return (
    <ConfigProvider componentSize="large" theme={antdTheme}>
      <AntdApp>
        <AppLayout />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
