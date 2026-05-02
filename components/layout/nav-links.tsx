'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  disabled?: boolean
  external?: boolean
}

interface NavLinksProps {
  items: readonly NavItem[]
  orientation?: 'horizontal' | 'vertical'
  className?: string
  onItemClick?: () => void
}

export function NavLinks({ items, orientation = 'horizontal', className, onItemClick }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex gap-1",
        orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
        className
      )}
    >
      {items.map((item) => {
        const isActive = pathname === item.href

        if (item.external) {
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-muted",
                item.disabled && "pointer-events-none opacity-50"
              )}
            >
              {item.label}
            </a>
          )
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
              item.disabled && "pointer-events-none opacity-50"
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
