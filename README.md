# 클리어웍스 (ClearWorks) 웹사이트

서울·경기·인천 유리창청소 & 외벽청소 전문 기업 클리어웍스 반응형 웹사이트 및 관리자 에디터입니다.

---

## 🚨 GitHub 업로드 후 흰 화면(White Screen)이 뜨는 원인 및 해결 방법

### 1. 원인
- **React + Vite 프로젝트 특성**: 프로젝트 소스코드의 `index.html`은 `<script type="module" src="/src/main.tsx"></script>`처럼 브라우저가 직접 해석할 수 없는 TypeScript/JSX 파일을 가리키고 있습니다.
- 브라우저는 빌드되지 않은 `.tsx` 파일을 바로 실행할 수 없으므로, **`npm run build` 과정을 거쳐 생성된 `dist` 폴더(순수 HTML, CSS, JS)가 서비스되어야 합니다.**
- 또한 GitHub Pages의 기본 주소는 `https://아이디.github.io/저장소이름/` 형태의 서브 디렉터리 경로이므로, `vite.config.ts`의 `base` 경로가 상대 경로(`'./'`)로 지정되어 있어야 자바스크립트 및 CSS 파일이 정상 로드됩니다.

---

### 2. 해결 방법 (가장 추천: GitHub Actions 자동 배포)

프로젝트에 이미 자동 빌드 및 배포 워크플로우(`.github/workflows/deploy.yml`)와 상대 경로 설정(`base: './'`)을 적용해 두었습니다. 아래 단계만 진행하시면 바로 해결됩니다:

1. **GitHub 저장소로 이동**
2. 상단 탭의 **`Settings`** 클릭
3. 좌측 사이드바 메뉴에서 **`Pages`** 클릭
4. **Build and deployment** 항목의 **Source** 옵션을 확인:
   - 기본값: `Deploy from a branch` ❌ (이 상태에서는 빌드되지 않은 원본 소스가 서빙되어 흰 화면이 뜸)
   - 변경할 값: **`GitHub Actions`** 로 선택! ⭕
5. 소스코드를 커밋 및 푸시(Push)하거나, 저장소 상단 **Actions** 탭에서 **Deploy to GitHub Pages** 워크플로우를 실행합니다.
6. 약 1~2분 후 배포가 완료되면 안내되는 URL(예: `https://<username>.github.io/<repo-name>/`)로 접속 시 웹사이트가 완벽하게 나타납니다.

---

### 3. 대안 방법 (내 컴퓨터에서 빌드 후 업로드하는 경우)

1. 터미널(VS Code 등)에서 의존성 설치:
   ```bash
   npm install
   ```
2. 프로덕션 빌드 실행:
   ```bash
   npm run build
   ```
3. 빌드가 완료되면 프로젝트 루트에 `dist` 폴더가 생성됩니다.
4. `dist` 폴더 안에 있는 파일들(`index.html`, `assets/` 등)을 저장소의 `gh-pages` 브랜치나 웹 호스팅 서버에 업로드하시면 됩니다.
