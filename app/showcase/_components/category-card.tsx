import * as React from "react"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
  title: string
  description: string
  icon: React.ReactNode
  isActive: boolean
  onClick: () => void
  componentCount: number
}

export function CategoryCard({
  title,
  description,
  icon,
  isActive,
  onClick,
  componentCount,
}: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "group relative flex flex-col gap-3 rounded-xl border p-5 text-left transition-all w-full",
        "hover:border-primary/50 hover:shadow-md",
        isActive
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border bg-card"
      )}
    >
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-lg transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
        )}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
      <span className="text-xs text-muted-foreground">{componentCount}개 컴포넌트</span>
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />
      )}
    </button>
  )
}
