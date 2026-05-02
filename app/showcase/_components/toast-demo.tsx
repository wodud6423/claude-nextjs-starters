'use client'

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

export function ToastDemo() {
  const { toast } = useToast()

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast({ title: "알림", description: "기본 토스트 메시지입니다." })
        }
      >
        기본
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast({
            title: "성공",
            description: "작업이 성공적으로 완료되었습니다.",
            variant: "success",
          })
        }
      >
        성공
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast({
            title: "오류",
            description: "작업 중 오류가 발생했습니다.",
            variant: "destructive",
          })
        }
      >
        오류
      </Button>
    </div>
  )
}
