import { theme } from 'antd'

export function createAntdTheme(isDark) {
  return {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      borderRadius: 6,
      colorPrimary: '#7c3aed',
      fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    },
    components: {
      Button: {
        fontWeight: 700,
      },
      Card: {
        borderRadiusLG: 8,
      },
    },
  }
}
