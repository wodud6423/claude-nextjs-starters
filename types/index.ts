// 테마 타입
export type Theme = 'light' | 'dark' | 'system'

// 네비게이션
export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  disabled?: boolean
  external?: boolean
}

// 사이트 설정
export interface SiteConfig {
  name: string
  description: string
  navItems: NavItem[]
}

// API 응답
export interface ApiResponse<T> {
  data: T
  error: string | null
  status: number
}

// 페이지네이션
export interface PaginationState {
  page: number
  pageSize: number
  total: number
}

// 공통 Props
export interface BaseProps {
  className?: string
  children?: React.ReactNode
}

// Toast
export interface ToastOptions {
  title?: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
  duration?: number
}

export interface ToastItem extends ToastOptions {
  id: string
}
