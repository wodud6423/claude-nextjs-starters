export const SITE_CONFIG = {
  name: 'Modern Starter',
  description: '모던 웹 스타터킷',
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'Showcase', href: '/showcase' },
    { label: 'Docs', href: '#', disabled: true },
  ],
} as const

export const THEME_STORAGE_KEY = 'theme'
export const TOAST_DURATION = 4000
export const MAX_TOAST_COUNT = 5

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com', external: true },
  { label: 'Twitter', href: 'https://twitter.com', external: true },
] as const
