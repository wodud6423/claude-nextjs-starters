import Link from "next/link"
import { ArrowRight, Palette, Zap, Layout, Puzzle, Moon, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    icon: Layout,
    title: "레이아웃 시스템",
    description: "Header, Footer, 반응형 모바일 메뉴가 포함된 완성된 레이아웃 구조",
  },
  {
    icon: Moon,
    title: "다크 모드",
    description: "라이트 / 다크 / 시스템 모드 자동 감지 및 localStorage 유지",
  },
  {
    icon: Puzzle,
    title: "shadcn/ui 컴포넌트",
    description: "Badge, Card, Input, Dialog, Toast 등 즉시 사용 가능한 UI 컴포넌트",
  },
  {
    icon: Zap,
    title: "커스텀 훅",
    description: "useMediaQuery, useLocalStorage, useDebounce, useToast 등 유틸리티 훅",
  },
  {
    icon: Palette,
    title: "디자인 토큰",
    description: "Tailwind CSS v4 기반 oklch 색상 시스템과 일관된 디자인 토큰",
  },
  {
    icon: Code,
    title: "TypeScript",
    description: "엄격한 타입 정의와 공통 인터페이스로 안전한 개발 환경",
  },
]

const stack = ["Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS v4", "shadcn/ui", "lucide-react"]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      {/* Hero */}
      <section className="mb-20 text-center">
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {stack.map((item) => (
            <Badge key={item} variant="secondary">{item}</Badge>
          ))}
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          모던 웹 스타터킷
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
          빠르게 웹 개발을 시작할 수 있도록 구성된 Next.js 스타터킷입니다.
          필요한 컴포넌트와 유틸리티가 모두 포함되어 있습니다.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/showcase">
              컴포넌트 둘러보기
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="mb-8 text-center text-2xl font-semibold">포함된 기능</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
