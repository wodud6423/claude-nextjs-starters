# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 프로젝트 개요

Next.js 16 + React 19 기반 모던 웹 스타터킷. shadcn/ui 컴포넌트와 다크모드, 반응형 레이아웃, 커스텀 훅을 포함한 템플릿 프로젝트.

## 개발 명령어

```bash
npm run dev      # 개발 서버 시작
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

테스트 설정 없음. 브라우저에서 직접 확인 필요.

## 아키텍처

**App Router 구조:**
- `app/` — Next.js App Router 페이지 (layout.tsx, page.tsx)
- `app/showcase/` — UI 컴포넌트 갤러리 페이지
- `components/ui/` — shadcn/ui 컴포넌트 (badge, button, card, dialog, input, select, tabs, toast 등)
- `components/layout/` — 레이아웃 컴포넌트 (header, footer, mobile-menu, nav-links, theme-toggle)
- `components/providers/` — ThemeProvider (라이트/다크/시스템 테마)
- `hooks/` — 커스텀 훅 (use-debounce, use-local-storage, use-media-query, use-toast)
- `lib/` — 유틸리티 함수 및 상수 (utils.ts, constants.ts)

**스타일링:**
- Tailwind CSS v4 (postcss 방식, `tailwind.config.*` 없음)
- CSS 커스텀 속성 기반 디자인 토큰은 `app/globals.css`에 정의
- shadcn/ui style: `radix-nova`, oklch 색상 시스템

**컴포넌트 추가:**
- shadcn/ui 컴포넌트 추가: `npx shadcn@latest add <component>`
- `components.json`에서 경로 alias 및 스타일 설정 관리

## 경로 Alias

`@/*` → 프로젝트 루트 기준 절대 경로
