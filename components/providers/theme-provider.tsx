'use client'

import * as React from "react"
import type { Theme } from "@/types"
import { THEME_STORAGE_KEY } from "@/lib/constants"

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
  mounted: boolean
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') return getSystemTheme()
  return theme
}

const VALID_THEMES = ['light', 'dark', 'system'] as const

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // 저장된 테마 로드
  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (stored && (VALID_THEMES as readonly string[]).includes(stored)) {
      setThemeState(stored as Theme)
    }
  }, [storageKey])

  // DOM 업데이트
  React.useEffect(() => {
    const resolved = resolveTheme(theme)
    document.documentElement.classList.toggle('dark', resolved === 'dark')
  }, [theme])

  // 시스템 테마 변경 감지
  React.useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      document.documentElement.classList.toggle('dark', mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [theme])

  const setTheme = React.useCallback((newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme)
    setThemeState(newTheme)
  }, [storageKey])

  const resolvedTheme = resolveTheme(theme)

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme는 ThemeProvider 내부에서 사용해야 합니다.')
  }
  return context
}
