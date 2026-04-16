# 🧙‍♂️ 호그와트 빅데이터 대시보드

> 중학생을 위한 데이터 리터러시 교육 플랫폼

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite)

## 📖 프로젝트 소개

해리 포터 세계관을 활용하여 중학생들이 데이터 분석의 기초를 재미있게 배울 수 있는 인터랙티브 대시보드입니다.

### 주요 기능

- 📊 **레이더 차트**: 6가지 능력치를 시각화하여 캐릭터 분석
- ⚔️ **대결 시뮬레이터**: 가중치 알고리즘을 활용한 승률 계산
- 📈 **산점도**: 변수 간 상관관계를 탐색하는 도구
- 🎯 **심화 분석 미션**: 학생들의 비판적 사고를 자극하는 과제

## 🎓 교육 목표

1. **데이터 리터러시**: 데이터를 읽고 해석하는 능력 향상
2. **시각화 이해**: 다양한 차트 타입의 용도 학습
3. **상관관계 분석**: 변수 간 관계를 파악하는 능력 배양
4. **알고리즘 이해**: 가중치 계산 등 기본적인 알고리즘 체험

## 📊 데이터셋 (13명)

- **그리핀도르**: 해리 포터, 헤르미온느, 론, 덤블도어, 해그리드, 시리우스, 맥고나걸, 네빌
- **슬리데린**: 볼드모트, 말포이, 스네이프, 벨라트릭스
- **소속 없음**: 도비 (집요정)

### 능력치 항목
- 마법력 (magic)
- 재력 (wealth)
- 성적 (grade)
- 용기 (courage)
- 결투능력 (combat)
- 흑마법 (darkArts)

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 📦 GitHub Pages 배포

### 1. GitHub 리포지토리 생성

1. GitHub에서 새 리포지토리를 생성합니다 (이름: `hogwarts-dashboard`)
2. 리포지토리를 public으로 설정합니다

### 2. Git 초기화 및 푸시

```bash
git init
git add .
git commit -m "Initial commit: Hogwarts Dashboard"
git branch -M main
git remote add origin https://github.com/your-username/hogwarts-dashboard.git
git push -u origin main
```

### 3. 배포 실행

```bash
npm run deploy
```

### 4. GitHub Pages 설정

1. GitHub 리포지토리의 **Settings** 탭으로 이동
2. 왼쪽 메뉴에서 **Pages** 선택
3. **Source**를 `gh-pages` 브랜치로 설정
4. 몇 분 후 `https://your-username.github.io/hogwarts-dashboard/`에서 확인

## 🎨 기술 스택

- **Frontend**: React 19.2
- **Styling**: Tailwind CSS 4.2
- **Build Tool**: Vite 8.0
- **Icons**: Lucide React
- **Charts**: 커스텀 SVG (라이브러리 없이 구현)
- **Deployment**: GitHub Pages

## 🧩 프로젝트 구조

```
hogwarts-dashboard/
├── src/
│   ├── App.jsx          # 메인 컴포넌트 (모든 기능 통합)
│   ├── index.css        # Tailwind 스타일
│   └── main.jsx         # 엔트리 포인트
├── public/              # 정적 파일
├── dist/                # 빌드 결과물
├── package.json
├── vite.config.js       # Vite 설정 (base 경로 포함)
├── tailwind.config.js   # Tailwind 설정
└── README.md
```

## 🎯 심화 분석 미션

### 미션 1: 상관관계 탐색
> 재력과 성적 사이에 상관관계가 있을까? 산점도로 확인해보세요!

**학습 포인트**: 두 변수 간의 관계를 시각적으로 파악하기

### 미션 2: 알고리즘 이해
> 마법력이 낮아도 용기로 볼드모트를 이길 수 있는 인물을 찾아보세요!

**학습 포인트**: 가중치 알고리즘 이해 (마법력 40% + 결투 40% + 용기 20%)

### 미션 3: 이상치 분석
> 도비의 능력치가 특별한 이유는 무엇일까요? 레이더 차트로 분석해보세요!

**학습 포인트**: 데이터의 패턴과 이상치(outlier) 파악

### 미션 4: 군집 분석
> 흑마법 점수가 높은 캐릭터들의 공통점을 찾아보세요!

**학습 포인트**: 데이터를 그룹화하고 특성 비교하기

## 💡 수업 활용 가이드

### 추천 활용 방법

1. **도입 (10분)**: 대시보드 인터페이스 탐색
2. **실습 (30분)**: 미션 1~4 순차적 진행
3. **토론 (15분)**: 발견한 인사이트 공유
4. **심화 (5분)**: 추가 가설 설정 및 검증

### 학습 성과

- ✅ 다양한 차트 유형 이해
- ✅ 데이터 필터링과 변환 능력
- ✅ 가설 설정 및 검증 경험
- ✅ 알고리즘의 기본 개념 이해

## 🔧 커스터마이징

### vite.config.js의 base 경로 수정

다른 리포지토리 이름을 사용하는 경우:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',  // 여기를 수정
})
```

### 캐릭터 데이터 추가

`src/App.jsx`의 `CHARACTERS` 배열에 새로운 캐릭터를 추가할 수 있습니다:

```javascript
const CHARACTERS = [
  // 기존 캐릭터들...
  { 
    name: '루나 러브굿', 
    house: '래번클로', 
    blood: '혼혈', 
    magic: 80, 
    wealth: 40, 
    grade: 85, 
    courage: 90, 
    combat: 65, 
    darkArts: 0 
  }
];
```

## 📝 라이선스

MIT License - 교육 목적으로 자유롭게 사용 가능합니다.

## 🙋‍♂️ 문의 및 피드백

프로젝트에 대한 질문이나 개선 제안이 있다면 이슈를 생성해 주세요!

---

**Made with ✨ for Data Literacy Education**
