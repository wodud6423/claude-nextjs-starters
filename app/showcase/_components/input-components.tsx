'use client'

import { useState } from "react"
import { ComponentSection } from "./component-section"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel, SelectGroup } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Search, Settings } from "lucide-react"

export function InputComponents() {
  const [checkedItems, setCheckedItems] = useState({
    option1: false,
    option2: true,
    option3: false,
  })
  const [radioValue, setRadioValue] = useState("option2")
  const [switchStates, setSwitchStates] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
  })

  return (
    <div className="space-y-12">
      {/* Checkbox */}
      <ComponentSection
        title="Checkbox"
        description="여러 항목 중 하나 이상을 선택하는 체크박스 컴포넌트. 독립적인 옵션을 다중으로 선택할 때 사용합니다."
      >
        <div className="space-y-3 max-w-xs">
          {[
            { id: "option1" as const, label: "이메일 알림 수신" },
            { id: "option2" as const, label: "SMS 알림 수신" },
            { id: "option3" as const, label: "푸시 알림 수신" },
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <Checkbox
                id={item.id}
                checked={checkedItems[item.id]}
                onCheckedChange={(checked) =>
                  setCheckedItems((prev) => ({ ...prev, [item.id]: !!checked }))
                }
              />
              <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <Checkbox id="disabled-check" disabled />
            <Label htmlFor="disabled-check" className="text-muted-foreground">비활성화 옵션</Label>
          </div>
        </div>
      </ComponentSection>

      {/* Radio Button */}
      <ComponentSection
        title="Radio Button"
        description="여러 옵션 중 하나만 선택할 수 있는 라디오 버튼 컴포넌트. 상호 배타적 선택지를 제공할 때 사용합니다."
      >
        <div className="max-w-xs">
          <RadioGroup value={radioValue} onValueChange={setRadioValue} className="space-y-3">
            {[
              { value: "option1", label: "기본 요금제", desc: "월 9,900원" },
              { value: "option2", label: "스탠다드 요금제", desc: "월 19,900원" },
              { value: "option3", label: "프리미엄 요금제", desc: "월 29,900원" },
            ].map((item) => (
              <div key={item.value} className="flex items-center gap-3">
                <RadioGroupItem value={item.value} id={`radio-${item.value}`} />
                <Label htmlFor={`radio-${item.value}`} className="cursor-pointer flex-1">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground ml-2">{item.desc}</span>
                </Label>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <RadioGroupItem value="disabled" id="radio-disabled" disabled />
              <Label htmlFor="radio-disabled" className="text-muted-foreground">비활성화 옵션</Label>
            </div>
          </RadioGroup>
        </div>
      </ComponentSection>

      {/* Text Fields */}
      <ComponentSection
        title="Text Fields"
        description="사용자로부터 텍스트를 입력받는 Input 컴포넌트. 다양한 상태(포커스, 오류, 비활성화)를 지원합니다."
      >
        <div className="grid gap-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="tf-basic">기본 입력</Label>
            <Input id="tf-basic" placeholder="텍스트를 입력하세요" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tf-search">검색 (아이콘 포함)</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="tf-search" className="pl-9" placeholder="검색어 입력..." />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tf-disabled">비활성화</Label>
            <Input id="tf-disabled" placeholder="비활성화된 입력" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tf-error">오류 상태</Label>
            <Input id="tf-error" placeholder="오류가 있는 입력" aria-invalid />
            <p className="text-xs text-destructive">올바른 값을 입력해주세요.</p>
          </div>
        </div>
      </ComponentSection>

      {/* Dropdown */}
      <ComponentSection
        title="Dropdown"
        description="목록에서 하나의 항목을 선택하는 드롭다운 컴포넌트. 공간 효율적으로 많은 선택지를 제공할 때 사용합니다."
      >
        <div className="grid gap-4 max-w-xs">
          <div className="space-y-2">
            <Label>카테고리 선택</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="카테고리를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>디자인</SelectLabel>
                  <SelectItem value="ui">UI/UX</SelectItem>
                  <SelectItem value="graphic">그래픽 디자인</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>개발</SelectLabel>
                  <SelectItem value="frontend">프론트엔드</SelectItem>
                  <SelectItem value="backend">백엔드</SelectItem>
                  <SelectItem value="mobile">모바일</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>국가 선택</Label>
            <Select defaultValue="kr">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kr">대한민국</SelectItem>
                <SelectItem value="us">미국</SelectItem>
                <SelectItem value="jp">일본</SelectItem>
                <SelectItem value="cn">중국</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ComponentSection>

      {/* Buttons */}
      <ComponentSection
        title="Buttons"
        description="사용자 액션을 트리거하는 버튼 컴포넌트. 다양한 변형(variant)과 크기(size)로 위계를 표현합니다."
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="xs">XSmall</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon"><Settings /></Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button disabled>비활성화</Button>
            <Button variant="outline" disabled>비활성화 Outline</Button>
          </div>
        </div>
      </ComponentSection>

      {/* Toggle */}
      <ComponentSection
        title="Toggle"
        description="켜기/끄기 두 가지 상태를 전환하는 스위치 컴포넌트. 설정이나 기능 활성화 여부를 직관적으로 표현합니다."
      >
        <div className="space-y-4 max-w-xs">
          {[
            { id: "notifications" as const, label: "알림 수신", desc: "새 알림을 받습니다" },
            { id: "darkMode" as const, label: "다크 모드", desc: "어두운 테마를 사용합니다" },
            { id: "autoSave" as const, label: "자동 저장", desc: "변경사항을 자동으로 저장합니다" },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch
                checked={switchStates[item.id]}
                onCheckedChange={(checked) =>
                  setSwitchStates((prev) => ({ ...prev, [item.id]: checked }))
                }
              />
            </div>
          ))}
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">비활성화 옵션</p>
              <p className="text-xs text-muted-foreground">사용할 수 없는 기능입니다</p>
            </div>
            <Switch disabled />
          </div>
        </div>
      </ComponentSection>
    </div>
  )
}
