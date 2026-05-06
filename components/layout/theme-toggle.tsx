'use client'

import { Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, mounted } = useTheme()

  if (!mounted) return <Button variant="ghost" size="icon" aria-label="테마 전환" disabled />

  const handleToggle = () => {
    if (theme === 'system') {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label="테마 전환"
    >
      {theme === 'system' ? (
        <Monitor className="size-4" />
      ) : resolvedTheme === 'dark' ? (
        <Moon className="size-4" />
      ) : (
        <Sun className="size-4" />
      )}
    </Button>
  )
}
