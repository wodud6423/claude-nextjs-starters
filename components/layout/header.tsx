import Link from "next/link"
import { NavLinks } from "@/components/layout/nav-links"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { MobileMenu } from "@/components/layout/mobile-menu"
import { SITE_CONFIG } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
        >
          <div className="size-6 rounded-md bg-primary" />
          {SITE_CONFIG.name}
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <NavLinks items={SITE_CONFIG.navItems} />
          <ThemeToggle />
        </div>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
