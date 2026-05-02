'use client'

import { useState } from "react"
import { ComponentSection } from "./component-section"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToastDemo } from "./toast-demo"
import {
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle,
  Lightbulb,
} from "lucide-react"

export function InformationComponents() {
  const [coachStep, setCoachStep] = useState(0)
  const coachSteps = [
    { title: "1단계: 프로젝트 생성", desc: "새 프로젝트 버튼을 눌러 시작하세요." },
    { title: "2단계: 설정 구성", desc: "프로젝트 이름과 옵션을 설정하세요." },
    { title: "3단계: 팀원 초대", desc: "협업할 팀원을 이메일로 초대하세요." },
  ]

  return (
    <TooltipProvider>
      <div className="space-y-12">
        {/* Guide Text */}
        <ComponentSection
          title="Guide Text"
          description="사용자가 작업을 이해하도록 돕는 안내 텍스트 컴포넌트. 폼 힌트, 설명, 경고 등 맥락에 맞게 사용합니다."
        >
          <div className="space-y-4 max-w-prose">
            <h1 className="text-4xl font-bold tracking-tight">Heading 1</h1>
            <h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
            <h3 className="text-2xl font-semibold tracking-tight">Heading 3</h3>
            <h4 className="text-xl font-semibold tracking-tight">Heading 4</h4>
            <p className="text-base leading-7 text-foreground">
              본문 텍스트입니다. 충분한 줄 간격으로 가독성을 높여 사용자가 정보를 쉽게 읽을 수 있도록 합니다.
            </p>
            <p className="text-sm text-muted-foreground">
              보조 텍스트입니다. 부가 설명이나 힌트, 메타 정보를 제공할 때 사용합니다.
            </p>
            <p className="text-xs text-muted-foreground">
              캡션 텍스트입니다. 이미지 설명, 법적 고지, 출처 표기 등에 활용합니다.
            </p>
          </div>
        </ComponentSection>

        {/* Tool Tips */}
        <ComponentSection
          title="Tool Tips"
          description="요소에 마우스를 올리면 추가 정보를 말풍선으로 보여주는 컴포넌트. 간단한 설명이나 단축키 안내에 사용합니다."
        >
          <div className="flex flex-wrap gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <HelpCircle className="size-4 mr-2" />
                  기본 툴팁
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>이것이 기본 툴팁입니다.</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  위쪽 툴팁
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>위쪽에 표시되는 툴팁입니다.</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  오른쪽 툴팁
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>오른쪽에 표시되는 툴팁입니다.</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Lightbulb className="size-4 mr-2" />
                  도움말
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ctrl + S 로 저장할 수 있습니다.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </ComponentSection>

        {/* Toast */}
        <ComponentSection
          title="Toast"
          description="화면 가장자리에 잠깐 나타났다 사라지는 알림 컴포넌트. 작업 결과나 시스템 메시지를 비방해적으로 전달합니다."
        >
          <ToastDemo />
        </ComponentSection>

        {/* Alert */}
        <ComponentSection
          title="Alert"
          description="중요한 정보, 경고, 오류 등을 강조하여 표시하는 인라인 알림 컴포넌트. 사용자 주의가 필요한 상황에 사용합니다."
        >
          <div className="space-y-3 max-w-lg">
            <Alert>
              <Info className="size-4" />
              <AlertTitle>일반 안내</AlertTitle>
              <AlertDescription>
                시스템 업데이트가 예정되어 있습니다. 2025년 5월 10일 오전 2시에 진행됩니다.
              </AlertDescription>
            </Alert>

            <Alert variant="success">
              <CheckCircle className="size-4" />
              <AlertTitle>성공</AlertTitle>
              <AlertDescription>
                파일이 성공적으로 업로드되었습니다. 처리까지 잠시 기다려주세요.
              </AlertDescription>
            </Alert>

            <Alert variant="warning">
              <AlertTriangle className="size-4" />
              <AlertTitle>주의</AlertTitle>
              <AlertDescription>
                저장 공간이 80% 사용되었습니다. 불필요한 파일을 정리해주세요.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <XCircle className="size-4" />
              <AlertTitle>오류</AlertTitle>
              <AlertDescription>
                서버 연결에 실패했습니다. 네트워크 상태를 확인하고 다시 시도해주세요.
              </AlertDescription>
            </Alert>
          </div>
        </ComponentSection>

        {/* Dialog */}
        <ComponentSection
          title="Dialog"
          description="현재 작업을 중단하고 추가 정보나 확인을 요청하는 모달 컴포넌트. 중요한 결정이나 폼 입력에 사용합니다."
        >
          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">기본 다이얼로그</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>다이얼로그 제목</DialogTitle>
                  <DialogDescription>
                    다이얼로그 설명 텍스트입니다. 사용자에게 추가 정보를 제공하거나 확인을 요청할 때 사용합니다.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="space-y-2">
                    <Label htmlFor="dialog-input">이름</Label>
                    <Input id="dialog-input" placeholder="이름을 입력하세요" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">취소</Button>
                  <Button>확인</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">삭제 확인 다이얼로그</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
                  <DialogDescription>
                    이 작업은 되돌릴 수 없습니다. 해당 항목이 영구적으로 삭제됩니다.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">취소</Button>
                  <Button variant="destructive">삭제</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </ComponentSection>

        {/* Coach Mark */}
        <ComponentSection
          title="Coach Mark"
          description="처음 사용자에게 UI 사용법을 단계별로 안내하는 컴포넌트. 온보딩 과정에서 주요 기능을 순서대로 설명합니다."
        >
          <div className="max-w-sm">
            {coachStep < coachSteps.length ? (
              <div className="rounded-xl border bg-card shadow-md overflow-hidden">
                <div className="bg-primary px-4 py-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-primary-foreground">
                    시작 가이드 ({coachStep + 1}/{coachSteps.length})
                  </span>
                  <button
                    className="text-primary-foreground/70 hover:text-primary-foreground text-xs"
                    onClick={() => setCoachStep(coachSteps.length)}
                  >
                    건너뛰기
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                      {coachStep + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{coachSteps[coachStep].title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{coachSteps[coachStep].desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex gap-1">
                      {coachSteps.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 w-6 rounded-full transition-colors ${
                            i <= coachStep ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setCoachStep((s) => s + 1)}
                    >
                      {coachStep < coachSteps.length - 1 ? "다음" : "완료"}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border bg-muted/50 p-4 text-center space-y-2">
                <CheckCircle className="size-8 text-green-500 mx-auto" />
                <p className="text-sm font-medium">가이드 완료!</p>
                <p className="text-xs text-muted-foreground">모든 단계를 완료했습니다.</p>
                <Button size="sm" variant="outline" onClick={() => setCoachStep(0)}>
                  다시 보기
                </Button>
              </div>
            )}
          </div>
        </ComponentSection>
      </div>
    </TooltipProvider>
  )
}
