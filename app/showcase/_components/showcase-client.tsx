'use client'

import { useState } from "react"
import { Layout, FormInput, Info } from "lucide-react"
import { CategoryCard } from "./category-card"
import { NavigationComponents } from "./navigation-components"
import { InputComponents } from "./input-components"
import { InformationComponents } from "./information-components"

type CategoryId = "navigation" | "input" | "information"

const CATEGORIES = [
  {
    id: "navigation" as CategoryId,
    title: "Navigation",
    description: "레이아웃과 탐색을 위한 컴포넌트",
    icon: <Layout className="size-5" />,
    componentCount: 6,
  },
  {
    id: "input" as CategoryId,
    title: "Input",
    description: "사용자 입력을 받는 폼 컴포넌트",
    icon: <FormInput className="size-5" />,
    componentCount: 6,
  },
  {
    id: "information" as CategoryId,
    title: "Information",
    description: "정보 전달을 위한 피드백 컴포넌트",
    icon: <Info className="size-5" />,
    componentCount: 6,
  },
]

export function ShowcaseClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null)

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            title={cat.title}
            description={cat.description}
            icon={cat.icon}
            isActive={activeCategory === cat.id}
            componentCount={cat.componentCount}
            onClick={() =>
              setActiveCategory(activeCategory === cat.id ? null : cat.id)
            }
          />
        ))}
      </div>

      {activeCategory === null && (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <p className="text-muted-foreground text-sm">
            위 카테고리 카드를 선택하면 해당 컴포넌트들이 표시됩니다.
          </p>
        </div>
      )}
      {activeCategory === "navigation" && <NavigationComponents />}
      {activeCategory === "input" && <InputComponents />}
      {activeCategory === "information" && <InformationComponents />}
    </div>
  )
}
