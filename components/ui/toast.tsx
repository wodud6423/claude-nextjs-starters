import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ToastItem } from "@/types"

interface ToastProps extends ToastItem {
  onDismiss: (id: string) => void
}

function Toast({ id, title, description, variant = "default", onDismiss }: ToastProps) {
  return (
    <div
      data-slot="toast"
      data-variant={variant}
      className={cn(
        "group relative flex w-full items-start gap-3 overflow-hidden rounded-xl border p-4 shadow-lg",
        "animate-in slide-in-from-right-full",
        {
          "bg-background text-foreground border-border": variant === "default",
          "bg-destructive/10 text-destructive border-destructive/30": variant === "destructive",
          "bg-green-500/10 text-green-700 border-green-500/30 dark:text-green-400": variant === "success",
        }
      )}
    >
      <div className="flex-1 space-y-1">
        {title && (
          <p className="text-sm font-semibold leading-none">{title}</p>
        )}
        {description && (
          <p className="text-sm opacity-90">{description}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="shrink-0 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <X className="size-4" />
        <span className="sr-only">닫기</span>
      </button>
    </div>
  )
}

export { Toast }
