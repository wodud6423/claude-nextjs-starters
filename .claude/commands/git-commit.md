# /git-commit

변경된 파일을 감지하고, **변경 종류(type)와 프로젝트 레이어**별로 커밋을 분리하여 Conventional Commits 형식으로 커밋한다.

`$ARGUMENTS`를 메시지 방향 힌트로 사용할 수 있다 (예: `/git-commit 로그인 버그 수정`).

---

## 실행 절차

### 1단계 — git 상태 확인

`git status`와 `git diff --staged`, `git diff`를 실행해 전체 변경 파일 목록과 내용을 파악한다.

- **staged 파일이 있으면** → 3단계로 바로 이동한다.
- **staged 파일이 없고 unstaged/untracked 파일만 있으면** → 2단계로 이동한다.
- **변경된 파일이 없으면** 아래 메시지를 출력하고 종료한다:
  ```
  커밋할 변경 사항이 없습니다.
  ```

---

### 2단계 — git add 선택

unstaged/untracked 파일 목록을 보여주고 사용자에게 선택을 요청한다:

```
다음 파일이 stage되지 않았습니다:
  M  src/components/Button.tsx
  M  src/lib/utils.ts
  ?  src/hooks/use-modal.ts

어떤 파일을 추가할까요?
  1) 전체 추가 (git add .)
  2) 파일 선택 (번호 또는 경로 입력)
  3) 취소
```

- **1 선택** → `git add .` 실행
- **2 선택** → 사용자가 입력한 파일만 `git add <파일>` 실행
- **3 선택** → 종료한다

---

### 3단계 — 커밋 그룹 분석 (핵심)

`git diff --staged`로 변경 내용 전체를 읽은 뒤, 각 파일을 **type**과 **레이어** 기준으로 그룹화한다.

#### type 분류 기준

| type | 사용 시점 |
|------|-----------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `chore` | 빌드, 설정, 의존성 변경 |
| `docs` | 문서 변경 |
| `refactor` | 기능 변경 없는 코드 개선 |
| `style` | 포맷, 공백 등 스타일 변경 |
| `test` | 테스트 추가 또는 수정 |

#### 레이어 분류 기준

| 레이어 | 해당 경로 예시 |
|--------|---------------|
| `app` | `app/**` (라우트, 페이지, 레이아웃) |
| `components` | `components/**` (UI, 레이아웃, providers) |
| `hooks` | `hooks/**` |
| `lib` | `lib/**`, `utils/**`, `types/**` |
| `config` | `*.config.*`, `.env*`, `package.json`, `.claude/**` 등 설정 파일 |
| `styles` | `*.css`, `*.scss`, 글로벌 스타일 |
| `docs` | `*.md`, `README*`, `CLAUDE.md` 등 |

#### 그룹화 규칙

- **type이 다르면** 반드시 별도 커밋으로 분리한다.
- **type이 같아도 레이어가 다르면** 별도 커밋으로 분리한다.
- **type과 레이어가 모두 같은 파일들**은 하나의 커밋으로 묶는다.
- `$ARGUMENTS`가 있으면 관련 그룹의 메시지 힌트로 활용한다.

#### 그룹 분석 결과 출력 예시

```
변경 파일 분석 결과 — 3개 커밋으로 분리됩니다:

  [커밋 1] fix / components
    - components/providers/theme-provider.tsx
    - components/layout/theme-toggle.tsx

  [커밋 2] chore / config
    - .claude/commands/git-commit.md

  [커밋 3] docs / docs
    - README.md

이 순서대로 커밋을 진행할까요?
  1) 확인 (순서대로 커밋)
  2) 그룹 재조정 (직접 수정)
  3) 취소
```

- **1 선택** → 4단계로 이동 (각 그룹을 순서대로 처리)
- **2 선택** → 사용자가 그룹 재조정 후 4단계로 이동
- **3 선택** → 종료한다

> **단일 그룹인 경우** 분리 안내 없이 바로 4단계의 메시지 확인으로 진행한다.

---

### 4단계 — 그룹별 커밋 메시지 확인 및 커밋 실행

각 그룹에 대해 순서대로 아래 절차를 반복한다.

#### 4-1. 해당 그룹 파일만 stage

이전 커밋 후 남은 파일이 unstaged 상태가 되므로, 해당 그룹 파일만 다시 `git add <파일...>`한다.

#### 4-2. 커밋 메시지 초안 제시

**Conventional Commits 형식:**
```
<type>(<레이어>): <한국어 설명>

[선택] 본문 — 변경 이유나 주요 내용 (필요 시)
```

예시:
```
커밋 메시지 초안 [1/3]:
──────────────────────────────
fix(components): ThemeProvider early return 제거로 useTheme 컨텍스트 누락 수정
──────────────────────────────

이 메시지로 커밋할까요?
  1) 확인 (그대로 커밋)
  2) 수정 (직접 입력)
  3) 취소 (이후 커밋 전체 중단)
```

- **1 선택** → 해당 그룹 커밋 실행 후 다음 그룹으로 이동
- **2 선택** → 사용자가 입력한 메시지로 교체 후 커밋 실행
- **3 선택** → 이후 그룹 커밋을 모두 중단하고 종료

#### 4-3. 커밋 실행

```bash
git commit -m "<확정된 메시지>"
```

---

### 5단계 — 전체 완료 요약

모든 그룹 커밋이 끝나면 아래 형식으로 결과를 출력한다:

```
✓ 커밋 완료! (총 3개)

  1. fix(components): ThemeProvider early return 제거로 useTheme 컨텍스트 누락 수정
     해시: a1b2c3d | 파일: 2개

  2. chore(config): git-commit 슬래시 커맨드 분리 커밋 전략 추가
     해시: b2c3d4e | 파일: 1개

  3. docs(docs): README 설치 가이드 업데이트
     해시: c3d4e5f | 파일: 1개

다음 단계:
- 원격 브랜치에 push하려면: git push
```
