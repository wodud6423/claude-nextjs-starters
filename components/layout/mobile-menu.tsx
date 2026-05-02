'use client'

import * as React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { NavLinks } from "@/components/layout/nav-links"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { SITE_CONFIG } from "@/lib/constants"

export function MobileMenu() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="메뉴 열기"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xs">
          <DialogHeader>
            <DialogTitle>{SITE_CONFIG.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-4">
            <NavLinks
              items={SITE_CONFIG.navItems}
              orientation="vertical"
              onItemClick={() => setOpen(false)}
            />
            <div className="flex items-center gap-2 px-3">
              <span className="text-sm text-muted-foreground">테마</span>
              <ThemeToggle />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
