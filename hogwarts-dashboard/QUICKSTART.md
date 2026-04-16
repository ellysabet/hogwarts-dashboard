# 🚀 호그와트 대시보드 - 빠른 시작 가이드

## ✅ 완료된 작업

1. ✅ Vite + React 프로젝트 생성
2. ✅ Tailwind CSS 4.2 설정 완료
3. ✅ lucide-react 아이콘 설치
4. ✅ gh-pages 배포 패키지 설치
5. ✅ 13명 캐릭터 데이터셋 구성 (도비 포함)
6. ✅ 레이더 차트 (커스텀 SVG) 구현
7. ✅ 대결 시뮬레이터 (가중치 알고리즘) 구현
8. ✅ 산점도 (커스텀 SVG) 구현
9. ✅ 심화 분석 미션 UI 구현
10. ✅ 필터 및 탭 인터페이스 구현
11. ✅ 프로덕션 빌드 완료
12. ✅ GitHub Pages 배포 설정 완료

## 📁 파일 구조

```
hogwarts-dashboard/
├── src/
│   ├── App.jsx          ← 모든 기능이 통합된 메인 컴포넌트
│   ├── index.css        ← Tailwind CSS 설정
│   └── main.jsx         ← React 엔트리 포인트
├── dist/                ← 빌드된 파일 (배포용)
├── public/              ← 정적 파일
├── package.json         ← 의존성 및 스크립트
├── vite.config.js       ← base: '/hogwarts-dashboard/' 설정됨
├── tailwind.config.js   ← Tailwind 설정
├── postcss.config.js    ← PostCSS 설정
├── .gitignore
└── README.md            ← 상세 문서
```

## 🎯 즉시 실행 방법

### 1. 프로젝트 폴더로 이동
```bash
cd hogwarts-dashboard
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속!

## 🌐 GitHub Pages 배포 (3단계)

### Step 1: GitHub 리포지토리 생성
- GitHub.com에서 새 리포지토리 생성
- 이름: `hogwarts-dashboard`
- Public으로 설정

### Step 2: 코드 푸시
```bash
git init
git add .
git commit -m "Initial commit: Hogwarts Dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hogwarts-dashboard.git
git push -u origin main
```

### Step 3: 배포 실행
```bash
npm run deploy
```

배포 완료 후 GitHub 리포지토리 Settings → Pages에서 `gh-pages` 브랜치를 선택하면
`https://YOUR_USERNAME.github.io/hogwarts-dashboard/`에서 접속 가능!

## 🔧 중요 설정 파일

### vite.config.js
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/hogwarts-dashboard/',  // GitHub Pages 경로
})
```

⚠️ **다른 리포지토리 이름 사용 시 이 부분을 수정하세요!**

### package.json (배포 스크립트)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

## 🎨 주요 기능

### 1️⃣ 레이더 차트
- 6가지 능력치를 한눈에 비교
- 순수 SVG로 구현 (라이브러리 없음)
- 극좌표 → 직교좌표 변환 알고리즘

### 2️⃣ 대결 시뮬레이터
- 가중치 알고리즘: 마법력(40%) + 결투(40%) + 용기(20%)
- 실시간 승률 계산
- 양방향 비교 인터페이스

### 3️⃣ 산점도
- X축, Y축 자유 선택
- 기숙사별 색상 구분
- 상관관계 분석 도구

### 4️⃣ 필터링
- 기숙사 필터 (전체, 그리핀도르, 슬리데린, 소속 없음)
- 혈통 필터 (전체, 순혈, 혼혈, 머글태생, 집요정)

## 📊 데이터 구조

```javascript
{
  name: '도비',
  house: '소속 없음',
  blood: '집요정',
  magic: 85,      // 마법력
  wealth: 5,      // 재력
  grade: 10,      // 성적
  courage: 100,   // 용기
  combat: 60,     // 결투능력
  darkArts: 0     // 흑마법
}
```

## 🎓 교육 활용 팁

1. **도입**: 학생들에게 대시보드를 자유롭게 탐색하게 함
2. **미션 제시**: 좌측 패널의 "심화 분석 미션" 순차 진행
3. **토론**: 발견한 패턴과 인사이트 공유
4. **심화**: 학생들이 직접 새로운 가설 수립

## 💡 커스터마이징 아이디어

### 캐릭터 추가
`src/App.jsx`의 `CHARACTERS` 배열에 추가:
```javascript
{ 
  name: '루나', 
  house: '래번클로', 
  blood: '혼혈', 
  magic: 80, 
  wealth: 40, 
  grade: 85, 
  courage: 90, 
  combat: 65, 
  darkArts: 0 
}
```

### 능력치 항목 변경
`RadarChart` 컴포넌트의 `stats` 배열 수정

### 색상 테마 변경
Tailwind 클래스 수정 (slate, amber, red, emerald, purple 등)

## 🐛 문제 해결

### npm install 실패 시
```bash
rm -rf node_modules package-lock.json
npm install
```

### 빌드 오류 시
```bash
npm run build
```
오류 메시지 확인 후 해당 파일 수정

### GitHub Pages 배포 안 될 때
1. 리포지토리가 Public인지 확인
2. Settings → Pages → Source가 `gh-pages`인지 확인
3. `vite.config.js`의 `base` 경로가 올바른지 확인

## 📞 추가 지원

- README.md: 전체 문서
- 프로젝트 이슈: GitHub Issues 활용
- Vite 공식 문서: https://vitejs.dev/
- React 공식 문서: https://react.dev/

---

**🎉 행운을 빕니다! 멋진 데이터 리터러시 교육을 진행하세요!**
