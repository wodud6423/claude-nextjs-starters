'use client'

import { useToast } from "@/hooks/use-toast"
import { Toast } from "@/components/ui/toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div
      data-slot="toaster"
      className="fixed bottom-4 right-4 z-[100] flex max-h-screen w-full max-w-sm flex-col gap-2"
    >
      {toasts.slice(0, 5).map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={dismiss} />
      ))}
    </div>
  )
}
