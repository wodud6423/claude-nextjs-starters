import { ComponentSection } from "./component-section"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Mail, Settings, Bell, FileText, Home, User, ChevronRight } from "lucide-react"

export function NavigationComponents() {
  return (
    <div className="space-y-12">
      {/* Card */}
      <ComponentSection
        title="Card"
        description="콘텐츠를 시각적으로 구분하는 컨테이너. 헤더·본문·푸터 영역으로 구성되며 정보를 묶어 표시합니다."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>기본 카드</CardTitle>
              <CardDescription>카드 설명 텍스트입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">카드 본문 내용이 들어갑니다.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">액션</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>아이콘 카드</CardTitle>
              <CardDescription>아이콘과 함께 사용하는 예시입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">이메일 알림</p>
                  <p className="text-xs text-muted-foreground">새 메일 3개</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>상태 카드</CardTitle>
                <Badge variant="success">활성</Badge>
              </div>
              <CardDescription>배지와 함께 사용하는 예시입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">시스템이 정상 동작 중입니다.</p>
            </CardContent>
          </Card>
        </div>
      </ComponentSection>

      {/* List */}
      <ComponentSection
        title="List"
        description="여러 항목을 순서 있게 나열하는 목록 컴포넌트. 아이콘, 배지, 액션 등을 조합해 정보를 구조화합니다."
      >
        <div className="max-w-sm rounded-xl border overflow-hidden">
          {[
            { icon: Home, label: "홈", badge: null },
            { icon: Bell, label: "알림", badge: "3" },
            { icon: FileText, label: "문서", badge: null },
            { icon: Settings, label: "설정", badge: null },
            { icon: User, label: "프로필", badge: null },
          ].map((item, idx, arr) => (
            <div key={item.label}>
              <div className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <item.icon className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <Badge variant="destructive" className="text-xs px-1.5 py-0">
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronRight className="size-4 text-muted-foreground" />
                </div>
              </div>
              {idx < arr.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </ComponentSection>

      {/* Gallery */}
      <ComponentSection
        title="Gallery"
        description="이미지나 미디어 콘텐츠를 격자 형태로 배열하는 갤러리 컴포넌트. 시각적 탐색에 최적화됩니다."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">
                이미지 {i + 1}
              </div>
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
            </div>
          ))}
        </div>
      </ComponentSection>

      {/* Carousel */}
      <ComponentSection
        title="Carousel"
        description="여러 항목을 가로로 스크롤하며 탐색하는 캐러셀 컴포넌트. 제한된 공간에서 많은 콘텐츠를 표시합니다."
      >
        <div className="relative overflow-hidden">
          <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card
                key={i}
                className="flex-none w-56 snap-start"
              >
                <CardHeader className="pb-2">
                  <div className="aspect-video rounded-md bg-muted flex items-center justify-center text-muted-foreground text-xs">
                    슬라이드 {i + 1}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">카드 제목 {i + 1}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">카드 설명 텍스트</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ComponentSection>

      {/* Tab */}
      <ComponentSection
        title="Tab"
        description="관련 콘텐츠를 탭으로 분류해 전환하는 컴포넌트. 같은 영역에서 여러 뷰를 효율적으로 탐색합니다."
      >
        <Tabs defaultValue="overview" className="max-w-lg">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="analytics">분석</TabsTrigger>
            <TabsTrigger value="settings">설정</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="rounded-lg border p-4">
            <p className="text-sm font-medium">개요 탭 내용</p>
            <p className="text-xs text-muted-foreground mt-1">
              프로젝트의 전반적인 현황을 확인할 수 있습니다.
            </p>
          </TabsContent>
          <TabsContent value="analytics" className="rounded-lg border p-4">
            <p className="text-sm font-medium">분석 탭 내용</p>
            <p className="text-xs text-muted-foreground mt-1">
              상세 분석 데이터와 차트가 표시됩니다.
            </p>
          </TabsContent>
          <TabsContent value="settings" className="rounded-lg border p-4">
            <p className="text-sm font-medium">설정 탭 내용</p>
            <p className="text-xs text-muted-foreground mt-1">
              프로젝트 설정을 변경할 수 있습니다.
            </p>
          </TabsContent>
        </Tabs>
      </ComponentSection>

      {/* Menu */}
      <ComponentSection
        title="Menu"
        description="명령어나 이동 경로를 목록으로 제공하는 메뉴 컴포넌트. 그룹과 구분선으로 항목을 체계적으로 구성합니다."
      >
        <div className="max-w-xs rounded-xl border shadow-sm overflow-hidden bg-popover">
          <div className="px-3 py-2">
            <p className="text-xs font-semibold text-muted-foreground px-2 py-1">계정</p>
            {[
              { icon: User, label: "프로필 보기" },
              { icon: Settings, label: "설정" },
            ].map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-2 w-full rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors"
              >
                <item.icon className="size-4 text-muted-foreground" />
                {item.label}
              </button>
            ))}
          </div>
          <Separator />
          <div className="px-3 py-2">
            <p className="text-xs font-semibold text-muted-foreground px-2 py-1">탐색</p>
            {[
              { icon: Home, label: "홈으로" },
              { icon: FileText, label: "문서" },
              { icon: Bell, label: "알림" },
            ].map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-2 w-full rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors"
              >
                <item.icon className="size-4 text-muted-foreground" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </ComponentSection>
    </div>
  )
}
