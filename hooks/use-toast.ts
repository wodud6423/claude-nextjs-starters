'use client'

import { useState, useEffect, useCallback } from 'react'
import type { ToastItem, ToastOptions } from '@/types'
import { TOAST_DURATION } from '@/lib/constants'

type ToastSubscriber = (toasts: ToastItem[]) => void

// globalThis를 사용해 Next.js 모듈 분할 환경에서도 단일 상태 공유
declare global {
  // eslint-disable-next-line no-var
  var __toastSubscribers: Set<ToastSubscriber> | undefined
  // eslint-disable-next-line no-var
  var __toasts: ToastItem[] | undefined
}

if (!globalThis.__toastSubscribers) {
  globalThis.__toastSubscribers = new Set<ToastSubscriber>()
}
if (!globalThis.__toasts) {
  globalThis.__toasts = []
}

function getSubscribers(): Set<ToastSubscriber> {
  return globalThis.__toastSubscribers!
}

function getToasts(): ToastItem[] {
  return globalThis.__toasts!
}

function setToasts(toasts: ToastItem[]) {
  globalThis.__toasts = toasts
}

function notifySubscribers() {
  getSubscribers().forEach((subscriber) => subscriber([...getToasts()]))
}

function addToast(options: ToastOptions): string {
  const id = crypto.randomUUID()
  const duration = options.duration ?? TOAST_DURATION

  const toast: ToastItem = {
    id,
    ...options,
  }

  setToasts([...getToasts(), toast])
  notifySubscribers()

  setTimeout(() => {
    removeToast(id)
  }, duration)

  return id
}

function removeToast(id: string) {
  setToasts(getToasts().filter((toast) => toast.id !== id))
  notifySubscribers()
}

export function useToast() {
  const [toastList, setToastList] = useState<ToastItem[]>([])

  useEffect(() => {
    const subscriber: ToastSubscriber = (newToasts) => {
      setToastList(newToasts)
    }

    getSubscribers().add(subscriber)
    setToastList([...getToasts()])

    return () => {
      getSubscribers().delete(subscriber)
    }
  }, [])

  const toast = useCallback((options: ToastOptions) => {
    return addToast(options)
  }, [])

  const dismiss = useCallback((id: string) => {
    removeToast(id)
  }, [])

  return { toasts: toastList, toast, dismiss }
}
