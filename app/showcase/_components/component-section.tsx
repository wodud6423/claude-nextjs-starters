import * as React from "react"
import { Separator } from "@/components/ui/separator"

interface ComponentSectionProps {
  title: string
  description: string
  children: React.ReactNode
}

export function ComponentSection({ title, description, children }: ComponentSectionProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-prose">{description}</p>
      </div>
      <Separator />
      <div>{children}</div>
    </section>
  )
}
