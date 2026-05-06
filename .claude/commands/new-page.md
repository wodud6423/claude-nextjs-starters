# /new-page

새 페이지의 이름을 인자로 받아 `app/<name>/` 디렉토리에 `page.tsx`와 `layout.tsx`를 생성하고, 선택적으로 `lib/constants.ts`의 네비게이션 항목을 추가한다.

## 실행 절차

### 1단계 — 인자 확인

`$ARGUMENTS`에서 페이지 이름을 읽는다.

- 인자가 없으면 사용자에게 페이지 이름을 질문한다.
- 이름은 kebab-case로 정규화한다 (예: `My Page` → `my-page`).
- `app/<name>/` 디렉토리가 이미 존재하면 덮어쓰기 여부를 사용자에게 확인한다.

### 2단계 — 파일 생성

아래 두 파일을 생성한다. `<Name>`은 PascalCase, `<name>`은 kebab-case, `<label>`은 사람이 읽기 좋은 Title Case로 변환한다.

**`app/<name>/layout.tsx`**

```tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "<label>",
  description: "<label> 페이지입니다.",
}

export default function <Name>Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
```

**`app/<name>/page.tsx`**

```tsx
export default function <Name>Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <section className="mb-12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          <label>
        </h1>
        <p className="text-lg text-muted-foreground">
          페이지 설명을 여기에 작성하세요.
        </p>
      </section>

      <section>
        {/* 콘텐츠를 여기에 추가하세요 */}
      </section>
    </div>
  )
}
```

### 3단계 — 네비게이션 추가 여부 질문

파일 생성 후 사용자에게 묻는다:

> `lib/constants.ts`의 `SITE_CONFIG.navItems`에 `/<name>` 항목을 추가할까요? (레이블 기본값: `<label>`)

- **yes** → `lib/constants.ts`를 열어 `navItems` 배열 끝에 아래 항목을 추가한다:
  ```ts
  { label: '<label>', href: '/<name>' },
  ```
- **no** → 건너뛴다.

### 4단계 — 완료 메시지

생성된 파일 목록과 다음 단계 안내를 출력한다:

```
✓ app/<name>/layout.tsx 생성됨
✓ app/<name>/page.tsx 생성됨
[✓ lib/constants.ts 네비게이션 항목 추가됨]  ← yes 선택 시만

다음 단계:
- http://localhost:3000/<name> 에서 페이지를 확인하세요.
- page.tsx에서 콘텐츠를 채워주세요.
```
