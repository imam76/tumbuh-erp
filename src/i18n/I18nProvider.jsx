import { useCallback, useEffect, useMemo, useState } from 'react'
import { I18nContext } from '@/i18n/I18nContext'
import { defaultLanguage, translations } from '@/i18n/translations'

const storageKey = 'ambilaja.language'

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return defaultLanguage
  }

  const storedLanguage = window.localStorage.getItem(storageKey)

  return translations[storedLanguage] ? storedLanguage : defaultLanguage
}

function getTranslationValue(language, key) {
  return key
    .split('.')
    .reduce(
      (currentValue, keyPart) => currentValue?.[keyPart],
      translations[language],
    )
}

function interpolate(value, params) {
  if (!params) {
    return value
  }

  return value.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? '')
}

export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage)

  const setLanguage = useCallback((nextLanguage) => {
    if (translations[nextLanguage]) {
      setLanguageState(nextLanguage)
    }
  }, [])

  const t = useCallback(
    (key, params) => {
      const value =
        getTranslationValue(language, key) ??
        getTranslationValue(defaultLanguage, key) ??
        key

      return typeof value === 'string' ? interpolate(value, params) : value
    },
    [language],
  )

  useEffect(() => {
    window.localStorage.setItem(storageKey, language)
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
