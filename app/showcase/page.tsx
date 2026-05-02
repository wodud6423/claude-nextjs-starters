import type { Metadata } from "next"
import { ShowcaseClient } from "./_components/showcase-client"

export const metadata: Metadata = {
  title: "컴포넌트 쇼케이스",
  description: "스타터킷에 포함된 모든 UI 컴포넌트를 카테고리별로 확인하세요.",
}

export default function ShowcasePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">컴포넌트 쇼케이스</h1>
        <p className="mt-2 text-muted-foreground">
          스타터킷에 포함된 모든 UI 컴포넌트를 카테고리별로 확인하세요.
        </p>
      </div>
      <ShowcaseClient />
    </div>
  )
}
