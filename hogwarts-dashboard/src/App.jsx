import { useState, useMemo } from 'react';
import { Wand2, Swords, Target, TrendingUp, Users, Sparkles, BookOpen, Wind, Clock, Heart, Shield, TrendingDown, Award, Zap, Plus, Minus, Compass } from 'lucide-react';

// 15명의 캐릭터 데이터
const CHARACTERS = [
  { name: '해리 포터', house: '그리핀도르', blood: '혼혈', magic: 85, wealth: 70, grade: 75, courage: 95, combat: 80, darkArts: 0, quidditch: 95, teamwork: 95, growth: 90, love: 100 },
  { name: '헤르미온느', house: '그리핀도르', blood: '머글태생', magic: 95, wealth: 60, grade: 100, courage: 85, combat: 75, darkArts: 0, quidditch: 40, teamwork: 90, growth: 85, love: 90 },
  { name: '론', house: '그리핀도르', blood: '순혈', magic: 70, wealth: 20, grade: 60, courage: 80, combat: 65, darkArts: 0, quidditch: 70, teamwork: 95, growth: 80, love: 85 },
  { name: '볼드모트', house: '슬리데린', blood: '혼혈', magic: 100, wealth: 85, grade: 90, courage: 70, combat: 100, darkArts: 100, quidditch: 60, teamwork: 10, growth: 0, love: 0 },
  { name: '말포이', house: '슬리데린', blood: '순혈', magic: 75, wealth: 95, grade: 80, courage: 40, combat: 60, darkArts: 50, quidditch: 85, teamwork: 50, growth: 60, love: 40 },
  { name: '덤블도어', house: '그리핀도르', blood: '혼혈', magic: 100, wealth: 70, grade: 100, courage: 90, combat: 95, darkArts: 20, quidditch: 50, teamwork: 85, growth: 95, love: 95 },
  { name: '스네이프', house: '슬리데린', blood: '혼혈', magic: 90, wealth: 50, grade: 95, courage: 85, combat: 85, darkArts: 60, quidditch: 45, teamwork: 40, growth: 70, love: 100 },
  { name: '해그리드', house: '그리핀도르', blood: '혼혈', magic: 50, wealth: 30, grade: 40, courage: 90, combat: 70, darkArts: 0, quidditch: 20, teamwork: 85, growth: 50, love: 95 },
  { name: '시리우스', house: '그리핀도르', blood: '순혈', magic: 85, wealth: 80, grade: 75, courage: 95, combat: 85, darkArts: 10, quidditch: 65, teamwork: 80, growth: 75, love: 90 },
  { name: '맥고나걸', house: '그리핀도르', blood: '혼혈', magic: 90, wealth: 60, grade: 95, courage: 85, combat: 80, darkArts: 5, quidditch: 55, teamwork: 75, growth: 80, love: 80 },
  { name: '벨라트릭스', house: '슬리데린', blood: '순혈', magic: 85, wealth: 90, grade: 80, courage: 75, combat: 90, darkArts: 95, quidditch: 50, teamwork: 60, growth: 30, love: 20 },
  { name: '네빌', house: '그리핀도르', blood: '순혈', magic: 70, wealth: 50, grade: 65, courage: 85, combat: 70, darkArts: 0, quidditch: 30, teamwork: 90, growth: 95, love: 85 },
  { name: '도비', house: '소속 없음', blood: '집요정', magic: 85, wealth: 5, grade: 10, courage: 100, combat: 60, darkArts: 0, quidditch: 15, teamwork: 100, growth: 70, love: 100 },
  { name: '루나', house: '레이븐클로', blood: '혼혈', magic: 80, wealth: 40, grade: 85, courage: 80, combat: 55, darkArts: 0, quidditch: 60, teamwork: 75, growth: 85, love: 90 },
  { name: '세드릭', house: '후플푸프', blood: '혼혈', magic: 78, wealth: 65, grade: 82, courage: 88, combat: 75, darkArts: 0, quidditch: 92, teamwork: 85, growth: 80, love: 85 }
];

// 모든 캐릭터의 학년별 성장 데이터 (간단한 성장 패턴 생성)
const generateGrowthData = (char) => {
  const finalMagic = char.magic;
  const finalCombat = char.combat;
  const finalCourage = char.courage;
  const finalDarkArts = char.darkArts;
  
  // 성장성에 따라 초기값 결정 (성장성 높으면 낮게 시작)
  const growthFactor = char.growth / 100;
  const startRatio = 1 - (growthFactor * 0.4); // 성장성 100이면 60%부터 시작
  
  return [
    { year: 1, magic: Math.round(finalMagic * startRatio), combat: Math.round(finalCombat * startRatio), courage: Math.round(finalCourage * startRatio), darkArts: finalDarkArts },
    { year: 2, magic: Math.round(finalMagic * (startRatio + growthFactor * 0.067)), combat: Math.round(finalCombat * (startRatio + growthFactor * 0.067)), courage: Math.round(finalCourage * (startRatio + growthFactor * 0.067)), darkArts: finalDarkArts },
    { year: 3, magic: Math.round(finalMagic * (startRatio + growthFactor * 0.133)), combat: Math.round(finalCombat * (startRatio + growthFactor * 0.133)), courage: Math.round(finalCourage * (startRatio + growthFactor * 0.133)), darkArts: finalDarkArts },
    { year: 4, magic: Math.round(finalMagic * (startRatio + growthFactor * 0.2)), combat: Math.round(finalCombat * (startRatio + growthFactor * 0.2)), courage: Math.round(finalCourage * (startRatio + growthFactor * 0.2)), darkArts: finalDarkArts },
    { year: 5, magic: Math.round(finalMagic * (startRatio + growthFactor * 0.267)), combat: Math.round(finalCombat * (startRatio + growthFactor * 0.267)), courage: Math.round(finalCourage * (startRatio + growthFactor * 0.267)), darkArts: finalDarkArts },
    { year: 6, magic: Math.round(finalMagic * (startRatio + growthFactor * 0.333)), combat: Math.round(finalCombat * (startRatio + growthFactor * 0.333)), courage: Math.round(finalCourage * (startRatio + growthFactor * 0.333)), darkArts: finalDarkArts },
    { year: 7, magic: finalMagic, combat: finalCombat, courage: finalCourage, darkArts: finalDarkArts }
  ];
};

// 모든 캐릭터의 성장 데이터 생성
const GROWTH_DATA = {};
CHARACTERS.forEach(char => {
  GROWTH_DATA[char.name] = generateGrowthData(char);
});

// 캐릭터별 전용 상황 변수 정의
const CHARACTER_MODIFIERS = {
  '해리 포터': [
    { id: 'mothersLove', label: '릴리의 보호', value: 50, description: '어머니의 희생으로 받은 보호 마법' },
    { id: 'friendship', label: '우정의 힘', value: 30, description: '친구들과의 유대감' },
    { id: 'prophecy', label: '예언의 힘', value: 25, description: '선택받은 자의 운명' }
  ],
  '헤르미온느': [
    { id: 'knowledge', label: '지식의 힘', value: 35, description: '방대한 마법 지식' },
    { id: 'preparation', label: '완벽한 준비', value: 25, description: '철저한 사전 준비' },
    { id: 'logic', label: '논리적 사고', value: 20, description: '냉철한 판단력' }
  ],
  '론': [
    { id: 'loyalty', label: '충성심', value: 30, description: '친구를 위한 헌신' },
    { id: 'bravery', label: '그리핀도르의 용기', value: 25, description: '두려움을 극복하는 힘' },
    { id: 'chess', label: '전략적 사고', value: 20, description: '체스로 단련된 전술' }
  ],
  '볼드모트': [
    { id: 'horcrux', label: '호크룩스 약점', value: -30, description: '불완전한 영혼' },
    { id: 'fear', label: '공포 전략', value: 25, description: '적에게 공포 심어주기' },
    { id: 'darkPower', label: '어둠의 힘', value: 30, description: '금지된 흑마법의 힘' }
  ],
  '덤블도어': [
    { id: 'wisdom', label: '지혜의 힘', value: 40, description: '오랜 경험과 통찰력' },
    { id: 'elderWand', label: '딱총나무 지팡이', value: 35, description: '전설의 마법 지팡이' },
    { id: 'phoenix', label: '불사조 동행', value: 25, description: '충성스러운 불사조' }
  ],
  '스네이프': [
    { id: 'doubleSpy', label: '이중 스파이', value: 30, description: '완벽한 위장술' },
    { id: 'occlumency', label: '폐쇄술', value: 25, description: '마음 읽기 방어' },
    { id: 'potionMaster', label: '물약 대가', value: 20, description: '최고의 물약 실력' }
  ],
  '도비': [
    { id: 'freedom', label: '자유정신', value: 40, description: '자유로운 집요정의 힘' },
    { id: 'loyalty', label: '절대 충성', value: 35, description: '해리에 대한 헌신' },
    { id: 'houseMagic', label: '집요정 마법', value: 30, description: '독특한 마법 능력' }
  ],
  '말포이': [
    { id: 'wealth', label: '재력의 힘', value: 25, description: '순혈 가문의 자원' },
    { id: 'cunning', label: '교활함', value: 20, description: '슬리데린의 지략' },
    { id: 'pride', label: '자존심', value: -15, description: '과도한 자만심' }
  ],
  '네빌': [
    { id: 'latentPower', label: '잠재력 각성', value: 35, description: '숨겨진 능력의 발현' },
    { id: 'plantMagic', label: '약초학 달인', value: 25, description: '식물 마법 전문' },
    { id: 'courage', label: '성장한 용기', value: 30, description: '극복한 두려움' }
  ],
  '해그리드': [
    { id: 'giantBlood', label: '거인의 혈통', value: 30, description: '강력한 육체' },
    { id: 'creatures', label: '마법 생물 친화', value: 25, description: '생물들과의 유대' },
    { id: 'loyalty', label: '변치 않는 충성', value: 20, description: '덤블도어에 대한 신뢰' }
  ],
  '시리우스': [
    { id: 'animagus', label: '애니마구스', value: 25, description: '개로 변신하는 능력' },
    { id: 'blackFamily', label: '블랙 가문', value: 20, description: '순혈 가문의 마법' },
    { id: 'godfather', label: '대부의 사랑', value: 30, description: '해리를 향한 애정' }
  ],
  '맥고나걸': [
    { id: 'transfiguration', label: '변신술 대가', value: 35, description: '최고의 변신술 실력' },
    { id: 'discipline', label: '철저한 규율', value: 25, description: '엄격한 통제력' },
    { id: 'headmistress', label: '교장의 권위', value: 20, description: '학교 전체 권한' }
  ],
  '벨라트릭스': [
    { id: 'madness', label: '광기의 힘', value: 25, description: '예측 불가능한 행동' },
    { id: 'darkArts', label: '흑마법 숙련', value: 30, description: '뛰어난 흑마법 실력' },
    { id: 'devotion', label: '볼드모트 숭배', value: 20, description: '절대적 헌신' }
  ],
  '루나': [
    { id: 'uniquePerspective', label: '독특한 시각', value: 30, description: '다른 관점으로 보기' },
    { id: 'openMind', label: '열린 마음', value: 25, description: '편견 없는 사고' },
    { id: 'spectrespecs', label: '스펙트레스펙', value: 20, description: '보이지 않는 것 보기' }
  ],
  '세드릭': [
    { id: 'fairPlay', label: '정정당당', value: 30, description: '공정한 경기 정신' },
    { id: 'loyalty', label: '후플푸프 충성', value: 25, description: '동료애와 인내' },
    { id: 'champion', label: '챔피언의 기량', value: 25, description: '시합 우승 경험' }
  ]
};

const HOUSES = ['전체', '그리핀도르', '슬리데린', '레이븐클로', '후플푸프', '소속 없음'];
const BLOOD_TYPES = ['전체', '순혈', '혼혈', '머글태생', '집요정'];

// 레이더 차트 컴포넌트
function RadarChart({ character }) {
  const stats = [
    { label: '마법력', value: character.magic, angle: 0 },
    { label: '재력', value: character.wealth, angle: 51.4 },
    { label: '성적', value: character.grade, angle: 102.8 },
    { label: '용기', value: character.courage, angle: 154.2 },
    { label: '결투', value: character.combat, angle: 205.7 },
    { label: '흑마법', value: character.darkArts, angle: 257.1 },
    { label: '쿼디치', value: character.quidditch, angle: 308.5 }
  ];

  const centerX = 200;
  const centerY = 200;
  const maxRadius = 140;
  const levels = 5;

  const polarToCartesian = (angle, radius) => {
    const angleInRadians = ((angle - 90) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const dataPoints = stats.map(stat => {
    const radius = (stat.value / 100) * maxRadius;
    return polarToCartesian(stat.angle, radius);
  });

  const pathData = dataPoints.map((point, i) => 
    `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  return (
    <div className="bg-slate-800 rounded-lg p-3 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-amber-400 mb-3 sm:mb-4 flex items-center gap-2">
        <Target className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="truncate">{character.name}의 표면적 능력치</span>
      </h3>
      <svg viewBox="0 0 400 400" className="w-full max-w-md mx-auto">
        {[...Array(levels)].map((_, i) => {
          const radius = (maxRadius / levels) * (i + 1);
          return (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="#475569"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}

        {stats.map((stat, i) => {
          const endPoint = polarToCartesian(stat.angle, maxRadius);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="#475569"
              strokeWidth="1"
              opacity="0.5"
            />
          );
        })}

        <path
          d={pathData}
          fill="#f59e0b"
          fillOpacity="0.3"
          stroke="#f59e0b"
          strokeWidth="2"
        />

        {dataPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#f59e0b"
          />
        ))}

        {stats.map((stat, i) => {
          const labelPoint = polarToCartesian(stat.angle, maxRadius + 30);
          return (
            <text
              key={i}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#cbd5e1"
              fontSize="12"
              fontWeight="600"
            >
              {stat.label}
            </text>
          );
        })}

        {stats.map((stat, i) => {
          const valuePoint = polarToCartesian(stat.angle, maxRadius + 50);
          return (
            <text
              key={i}
              x={valuePoint.x}
              y={valuePoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#f59e0b"
              fontSize="13"
              fontWeight="bold"
            >
              {stat.value}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// 숨겨진 능력치 레이더 차트
function HiddenStatsRadar({ character }) {
  const stats = [
    { label: '팀워크', value: character.teamwork, angle: 0 },
    { label: '성장성', value: character.growth, angle: 72 },
    { label: '사랑', value: character.love, angle: 144 },
    { label: '순수동기', value: 100 - character.darkArts, angle: 216 },
    { label: '희생정신', value: character.courage, angle: 288 }
  ];

  const centerX = 150;
  const centerY = 150;
  const maxRadius = 110;

  const polarToCartesian = (angle, radius) => {
    const angleInRadians = ((angle - 90) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const dataPoints = stats.map(stat => {
    const radius = (stat.value / 100) * maxRadius;
    return polarToCartesian(stat.angle, radius);
  });

  const pathData = dataPoints.map((point, i) => 
    `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  return (
    <div className="bg-slate-800 rounded-lg p-3 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-purple-400 mb-3 sm:mb-4 flex items-center gap-2">
        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="truncate">{character.name}의 숨겨진 능력치</span>
      </h3>
      <svg viewBox="0 0 300 300" className="w-full max-w-sm mx-auto">
        {[1, 2, 3, 4, 5].map((_, i) => {
          const radius = (maxRadius / 5) * (i + 1);
          return (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="#6b21a8"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}

        {stats.map((stat, i) => {
          const endPoint = polarToCartesian(stat.angle, maxRadius);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="#6b21a8"
              strokeWidth="1"
              opacity="0.5"
            />
          );
        })}

        <path
          d={pathData}
          fill="#a855f7"
          fillOpacity="0.4"
          stroke="#a855f7"
          strokeWidth="2"
        />

        {dataPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#a855f7"
          />
        ))}

        {stats.map((stat, i) => {
          const labelPoint = polarToCartesian(stat.angle, maxRadius + 25);
          return (
            <text
              key={i}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#e9d5ff"
              fontSize="11"
              fontWeight="600"
            >
              {stat.label}
            </text>
          );
        })}
      </svg>
      
      <div className="mt-4 text-xs sm:text-sm text-purple-200 bg-purple-900/30 rounded p-3">
        <p className="font-bold mb-2">💡 데이터가 보여주지 못하는 것들</p>
        <p>사랑, 희생, 성장 가능성은 측정하기 어렵지만 승패를 결정짓는 핵심 요소입니다.</p>
      </div>
    </div>
  );
}

// 학년별 성장 차트 - 선택한 캐릭터 + 비교 대상
function GrowthChart({ selectedYear, selectedCharacter }) {
  const [compareChar, setCompareChar] = useState('비교 안 함');
  
  const mainData = GROWTH_DATA[selectedCharacter.name] || GROWTH_DATA['해리 포터'];
  const compareData = compareChar !== '비교 안 함' ? GROWTH_DATA[compareChar] : null;
  
  const width = 600;
  const height = 350;
  const padding = 60;

  // 성장률 계산
  const calculateGrowthRate = (data) => {
    const start = data[0].magic;
    const end = data[6].magic;
    return start > 0 ? (((end - start) / start) * 100).toFixed(0) : 0;
  };

  const mainGrowthRate = calculateGrowthRate(mainData);
  const compareGrowthRate = compareData ? calculateGrowthRate(compareData) : 0;

  return (
    <div className="bg-slate-800 rounded-lg p-3 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-3 sm:mb-4 flex items-center gap-2">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">{selectedCharacter.name}의 성장 곡선</span>
      </h3>

      {/* 비교 대상 선택 */}
      <div className="mb-4">
        <label className="block text-xs sm:text-sm text-slate-400 mb-2">비교 대상 선택</label>
        <select
          value={compareChar}
          onChange={(e) => setCompareChar(e.target.value)}
          className="w-full sm:w-64 bg-slate-700 text-white rounded px-2 sm:px-3 py-2 border border-slate-600 text-sm"
        >
          <option value="비교 안 함">비교 안 함</option>
          {CHARACTERS.filter(c => c.name !== selectedCharacter.name).map(char => (
            <option key={char.name} value={char.name}>{char.name}</option>
          ))}
        </select>
      </div>
      
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {/* 그리드 */}
        {[1, 2, 3, 4, 5, 6, 7].map(year => {
          const x = padding + ((year - 1) / 6) * (width - 2 * padding);
          return (
            <g key={year}>
              <line
                x1={x}
                y1={padding}
                x2={x}
                y2={height - padding}
                stroke="#475569"
                strokeWidth="1"
                opacity="0.3"
              />
              <text
                x={x}
                y={height - padding + 20}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="12"
              >
                {year}학년
              </text>
            </g>
          );
        })}

        {[0, 25, 50, 75, 100].map(val => {
          const y = height - padding - (val / 100) * (height - 2 * padding);
          return (
            <g key={val}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#475569"
                strokeWidth="1"
                opacity="0.3"
              />
              <text
                x={padding - 15}
                y={y}
                textAnchor="end"
                fill="#94a3b8"
                fontSize="11"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* 메인 캐릭터 선 */}
        <path
          d={mainData.map((data, i) => {
            const x = padding + ((data.year - 1) / 6) * (width - 2 * padding);
            const y = height - padding - (data.magic / 100) * (height - 2 * padding);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
          }).join(' ')}
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
        />

        {/* 비교 캐릭터 선 */}
        {compareData && (
          <path
            d={compareData.map((data, i) => {
              const x = padding + ((data.year - 1) / 6) * (width - 2 * padding);
              const y = height - padding - (data.magic / 100) * (height - 2 * padding);
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            fill="none"
            stroke="#dc2626"
            strokeWidth="3"
            strokeDasharray="5,5"
          />
        )}

        {/* 현재 학년 표시 */}
        {(() => {
          const mainPoint = mainData[selectedYear - 1];
          const x = padding + ((selectedYear - 1) / 6) * (width - 2 * padding);
          const mainY = height - padding - (mainPoint.magic / 100) * (height - 2 * padding);

          return (
            <>
              <circle cx={x} cy={mainY} r="6" fill="#10b981" />
              {compareData && (() => {
                const comparePoint = compareData[selectedYear - 1];
                const compareY = height - padding - (comparePoint.magic / 100) * (height - 2 * padding);
                return <circle cx={x} cy={compareY} r="6" fill="#dc2626" />;
              })()}
              <line x1={x} y1={padding} x2={x} y2={height - padding} stroke="#fbbf24" strokeWidth="2" opacity="0.5" />
            </>
          );
        })()}

        {/* 범례 */}
        <g transform={`translate(${width - 180}, 30)`}>
          <line x1="0" y1="0" x2="30" y2="0" stroke="#10b981" strokeWidth="3" />
          <text x="35" y="5" fill="#10b981" fontSize="12">{selectedCharacter.name}</text>
          
          {compareData && (
            <>
              <line x1="0" y1="25" x2="30" y2="25" stroke="#dc2626" strokeWidth="3" strokeDasharray="5,5" />
              <text x="35" y="30" fill="#dc2626" fontSize="12">{compareChar}</text>
            </>
          )}
        </g>

        {/* 축 레이블 */}
        <text x={width / 2} y={height - 10} textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="bold">
          학년
        </text>
        <text x={20} y={height / 2} textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="bold" transform={`rotate(-90, 20, ${height / 2})`}>
          마법력
        </text>
      </svg>

      {/* 성장률 정보 */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
        <div className="bg-emerald-900/30 rounded p-3">
          <div className="text-emerald-400 font-bold mb-1">{selectedCharacter.name}의 성장률</div>
          <div className="text-emerald-200">1학년: {mainData[0].magic} → 7학년: {mainData[6].magic}</div>
          <div className="text-emerald-300 font-bold">
            {mainGrowthRate > 0 ? `+${mainGrowthRate}% 성장! 📈` : '0% 성장 (정체)'}
          </div>
        </div>
        
        {compareData && (
          <div className="bg-red-900/30 rounded p-3">
            <div className="text-red-400 font-bold mb-1">{compareChar}의 성장률</div>
            <div className="text-red-200">1학년: {compareData[0].magic} → 7학년: {compareData[6].magic}</div>
            <div className="text-red-300 font-bold">
              {compareGrowthRate > 0 ? `+${compareGrowthRate}% 성장! 📈` : '0% 성장 (정체)'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 개선된 시나리오 시뮬레이터
function ScenarioSimulator({ characters }) {
  const [fighter1, setFighter1] = useState(characters[0]);
  const [fighter2, setFighter2] = useState(characters[3]);
  const [modifiers1, setModifiers1] = useState({});
  const [modifiers2, setModifiers2] = useState({});

  const handleFighter1Change = (char) => {
    setFighter1(char);
    setModifiers1({});
  };

  const handleFighter2Change = (char) => {
    setFighter2(char);
    setModifiers2({});
  };

  const calculatePower = (char, modifiersState) => {
    let basePower = char.magic * 0.4 + char.combat * 0.4 + char.courage * 0.2;
    
    const charModifiers = CHARACTER_MODIFIERS[char.name] || [];
    charModifiers.forEach(mod => {
      if (modifiersState[mod.id]) {
        basePower += mod.value;
      }
    });
    
    return basePower;
  };

  const power1 = calculatePower(fighter1, modifiers1);
  const power2 = calculatePower(fighter2, modifiers2);
  const total = power1 + power2;
  const winRate1 = total > 0 ? (power1 / total * 100).toFixed(1) : 50;
  const winRate2 = total > 0 ? (power2 / total * 100).toFixed(1) : 50;

  const fighter1Modifiers = CHARACTER_MODIFIERS[fighter1.name] || [];
  const fighter2Modifiers = CHARACTER_MODIFIERS[fighter2.name] || [];

  return (
    <div className="bg-slate-800 rounded-lg p-3 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-violet-400 mb-3 sm:mb-4 flex items-center gap-2">
        <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">시나리오 기반 전투 시뮬레이터</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <label className="block text-xs sm:text-sm text-slate-400 mb-2">마법사 1</label>
          <select
            value={fighter1.name}
            onChange={(e) => handleFighter1Change(characters.find(c => c.name === e.target.value))}
            className="w-full bg-slate-700 text-white rounded px-2 sm:px-3 py-2 border border-slate-600 text-sm"
          >
            {characters.map(char => (
              <option key={char.name} value={char.name}>{char.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-xs sm:text-sm text-slate-400 mb-2">마법사 2</label>
          <select
            value={fighter2.name}
            onChange={(e) => handleFighter2Change(characters.find(c => c.name === e.target.value))}
            className="w-full bg-slate-700 text-white rounded px-2 sm:px-3 py-2 border border-slate-600 text-sm"
          >
            {characters.map(char => (
              <option key={char.name} value={char.name}>{char.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-700 rounded-lg p-3 sm:p-4">
          <h4 className="font-bold text-amber-400 mb-3 text-sm sm:text-base">{fighter1.name}의 상황 변수</h4>
          {fighter1Modifiers.length > 0 ? (
            <div className="space-y-2">
              {fighter1Modifiers.map(mod => (
                <label key={mod.id} className="flex items-start gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={modifiers1[mod.id] || false}
                    onChange={(e) => setModifiers1({...modifiers1, [mod.id]: e.target.checked})}
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="text-slate-200 text-xs sm:text-sm">
                      {mod.label} ({mod.value > 0 ? '+' : ''}{mod.value})
                    </div>
                    <div className="text-slate-400 text-xs">{mod.description}</div>
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <div className="text-slate-400 text-xs sm:text-sm">이 캐릭터는 특별한 상황 변수가 없습니다.</div>
          )}
        </div>

        <div className="bg-slate-700 rounded-lg p-3 sm:p-4">
          <h4 className="font-bold text-red-400 mb-3 text-sm sm:text-base">{fighter2.name}의 상황 변수</h4>
          {fighter2Modifiers.length > 0 ? (
            <div className="space-y-2">
              {fighter2Modifiers.map(mod => (
                <label key={mod.id} className="flex items-start gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={modifiers2[mod.id] || false}
                    onChange={(e) => setModifiers2({...modifiers2, [mod.id]: e.target.checked})}
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="text-slate-200 text-xs sm:text-sm">
                      {mod.label} ({mod.value > 0 ? '+' : ''}{mod.value})
                    </div>
                    <div className="text-slate-400 text-xs">{mod.description}</div>
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <div className="text-slate-400 text-xs sm:text-sm">이 캐릭터는 특별한 상황 변수가 없습니다.</div>
          )}
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between text-xs sm:text-sm mb-2">
          <span className="text-amber-400 font-bold truncate mr-2">{fighter1.name}</span>
          <span className="text-red-400 font-bold truncate ml-2">{fighter2.name}</span>
        </div>
        <div className="flex h-8 sm:h-10 rounded-lg overflow-hidden">
          <div 
            className="bg-amber-500 flex items-center justify-center text-white text-xs sm:text-sm font-bold transition-all duration-500"
            style={{ width: `${winRate1}%` }}
          >
            {winRate1}%
          </div>
          <div 
            className="bg-red-500 flex items-center justify-center text-white text-xs sm:text-sm font-bold transition-all duration-500"
            style={{ width: `${winRate2}%` }}
          >
            {winRate2}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div className="bg-slate-700 rounded p-3 sm:p-4">
          <div className="text-amber-400 font-bold mb-2 sm:mb-3 text-sm sm:text-base truncate">{fighter1.name}</div>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-300">
            <div>기본: {(fighter1.magic * 0.4 + fighter1.combat * 0.4 + fighter1.courage * 0.2).toFixed(1)}</div>
            {fighter1Modifiers.map(mod => modifiers1[mod.id] && (
              <div key={mod.id} className={mod.value > 0 ? 'text-green-400' : 'text-red-400'}>
                {mod.value > 0 ? '+' : ''} {mod.label}: {mod.value > 0 ? '+' : ''}{mod.value}
              </div>
            ))}
            <div className="pt-2 border-t border-slate-600 text-amber-400 font-bold">
              최종: {power1.toFixed(1)}
            </div>
          </div>
        </div>
        
        <div className="bg-slate-700 rounded p-3 sm:p-4">
          <div className="text-red-400 font-bold mb-2 sm:mb-3 text-sm sm:text-base truncate">{fighter2.name}</div>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-300">
            <div>기본: {(fighter2.magic * 0.4 + fighter2.combat * 0.4 + fighter2.courage * 0.2).toFixed(1)}</div>
            {fighter2Modifiers.map(mod => modifiers2[mod.id] && (
              <div key={mod.id} className={mod.value > 0 ? 'text-green-400' : 'text-red-400'}>
                {mod.value > 0 ? '+' : ''} {mod.label}: {mod.value > 0 ? '+' : ''}{mod.value}
              </div>
            ))}
            <div className="pt-2 border-t border-slate-600 text-red-400 font-bold">
              최종: {power2.toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      <div className={`text-center p-3 sm:p-4 rounded-lg ${
        power1 > power2 ? 'bg-amber-500/20 text-amber-400' : power2 > power1 ? 'bg-red-500/20 text-red-400' : 'bg-slate-500/20 text-slate-400'
      }`}>
        <div className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
          {power1 > power2 ? `🏆 ${fighter1.name} 승리!` : power2 > power1 ? `🏆 ${fighter2.name} 승리!` : '⚔️ 무승부!'}
        </div>
        <div className="text-xs sm:text-sm">
          {power1 > power2 
            ? `${fighter1.name}의 특별한 힘이 승리를 가져왔습니다!`
            : power2 > power1
            ? `${fighter2.name}의 특별한 힘이 승리를 가져왔습니다!`
            : '양측의 힘이 완벽하게 균형을 이룹니다!'}
        </div>
      </div>

      <div className="mt-4 bg-violet-900/30 rounded p-3 text-xs sm:text-sm text-violet-200">
        <p className="font-bold mb-2">💡 데이터 리터러시 포인트</p>
        <p>각 캐릭터마다 고유한 상황 변수가 있습니다. 동일한 기본 능력치라도 상황과 맥락에 따라 승패가 달라질 수 있습니다!</p>
      </div>
    </div>
  );
}

// 개선된 팀 전투 시뮬레이터 (자유 구성)
function TeamBattleSimulator({ characters }) {
  const [teamA, setTeamA] = useState([characters[0], characters[1], characters[2]]);
  const [teamB, setTeamB] = useState([characters[3]]);
  
  const addMemberToTeam = (team, setTeam, character) => {
    if (team.length < 5 && !team.find(c => c.name === character.name)) {
      setTeam([...team, character]);
    }
  };

  const removeMemberFromTeam = (team, setTeam, index) => {
    if (team.length > 1) {
      setTeam(team.filter((_, i) => i !== index));
    }
  };

  const calculateTeamPower = (team) => {
    const individualPower = team.reduce((sum, char) => {
      return sum + (char.magic * 0.4 + char.combat * 0.4 + char.courage * 0.2);
    }, 0);
    
    const avgTeamwork = team.reduce((sum, char) => sum + char.teamwork, 0) / team.length;
    const synergyBonus = (avgTeamwork / 100) * 30 * team.length;
    
    return individualPower + synergyBonus;
  };

  const powerA = calculateTeamPower(teamA);
  const powerB = calculateTeamPower(teamB);
  const total = powerA + powerB;

  const availableForA = characters.filter(c => !teamA.find(t => t.name === c.name));
  const availableForB = characters.filter(c => !teamB.find(t => t.name === c.name));

  return (
    <div className="bg-slate-800 rounded-lg p-3 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-3 sm:mb-4 flex items-center gap-2">
        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">팀 전투 시뮬레이터</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* 팀 A */}
        <div>
          <h4 className="font-bold text-amber-400 mb-3 text-sm sm:text-base">
            팀 A (총 {teamA.length}명) {teamA.length >= 5 && <span className="text-xs text-amber-300">• 인원 마감</span>}
          </h4>
          <div className="space-y-2 mb-3">
            {teamA.map((char, index) => (
              <div key={index} className="bg-slate-700 rounded p-2 flex items-center justify-between text-xs sm:text-sm">
                <span className="truncate">{char.name} (팀워크: {char.teamwork})</span>
                {teamA.length > 1 && (
                  <button
                    onClick={() => removeMemberFromTeam(teamA, setTeamA, index)}
                    className="text-red-400 hover:text-red-300 ml-2 flex-shrink-0"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {teamA.length < 5 && (
            <div>
              <label className="block text-xs text-slate-400 mb-2">팀원 추가</label>
              <select
                onChange={(e) => {
                  const char = characters.find(c => c.name === e.target.value);
                  if (char) addMemberToTeam(teamA, setTeamA, char);
                  e.target.value = '';
                }}
                className="w-full bg-slate-700 text-white rounded px-2 py-2 border border-slate-600 text-xs sm:text-sm"
                value=""
              >
                <option value="">선택하세요...</option>
                {availableForA.map(char => (
                  <option key={char.name} value={char.name}>{char.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        {/* 팀 B */}
        <div>
          <h4 className="font-bold text-red-400 mb-3 text-sm sm:text-base">
            팀 B (총 {teamB.length}명) {teamB.length >= 5 && <span className="text-xs text-red-300">• 인원 마감</span>}
          </h4>
          <div className="space-y-2 mb-3">
            {teamB.map((char, index) => (
              <div key={index} className="bg-slate-700 rounded p-2 flex items-center justify-between text-xs sm:text-sm">
                <span className="truncate">{char.name} (팀워크: {char.teamwork})</span>
                {teamB.length > 1 && (
                  <button
                    onClick={() => removeMemberFromTeam(teamB, setTeamB, index)}
                    className="text-red-400 hover:text-red-300 ml-2 flex-shrink-0"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {teamB.length < 5 && (
            <div>
              <label className="block text-xs text-slate-400 mb-2">팀원 추가</label>
              <select
                onChange={(e) => {
                  const char = characters.find(c => c.name === e.target.value);
                  if (char) addMemberToTeam(teamB, setTeamB, char);
                  e.target.value = '';
                }}
                className="w-full bg-slate-700 text-white rounded px-2 py-2 border border-slate-600 text-xs sm:text-sm"
                value=""
              >
                <option value="">선택하세요...</option>
                {availableForB.map(char => (
                  <option key={char.name} value={char.name}>{char.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="flex h-10 sm:h-12 rounded-lg overflow-hidden mb-4">
        <div 
          className="bg-amber-500 flex items-center justify-center text-white font-bold text-sm sm:text-base"
          style={{ width: `${(powerA / total * 100).toFixed(1)}%` }}
        >
          팀 A: {(powerA / total * 100).toFixed(1)}%
        </div>
        <div 
          className="bg-red-500 flex items-center justify-center text-white font-bold text-sm sm:text-base"
          style={{ width: `${(powerB / total * 100).toFixed(1)}%` }}
        >
          팀 B: {(powerB / total * 100).toFixed(1)}%
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs sm:text-sm">
        <div className="bg-slate-700 rounded p-3">
          <div className="text-amber-400 font-bold mb-2">팀 A 분석</div>
          <div className="space-y-1 text-slate-300">
            <div>평균 팀워크: {(teamA.reduce((sum, c) => sum + c.teamwork, 0) / teamA.length).toFixed(1)}</div>
            <div>팀워크 보너스: +{((teamA.reduce((sum, c) => sum + c.teamwork, 0) / teamA.length / 100) * 30 * teamA.length).toFixed(1)}</div>
            <div className="pt-2 border-t border-slate-600 text-amber-400 font-bold">
              최종 전투력: {powerA.toFixed(1)}
            </div>
          </div>
        </div>
        
        <div className="bg-slate-700 rounded p-3">
          <div className="text-red-400 font-bold mb-2">팀 B 분석</div>
          <div className="space-y-1 text-slate-300">
            <div>평균 팀워크: {(teamB.reduce((sum, c) => sum + c.teamwork, 0) / teamB.length).toFixed(1)}</div>
            <div>팀워크 보너스: +{((teamB.reduce((sum, c) => sum + c.teamwork, 0) / teamB.length / 100) * 30 * teamB.length).toFixed(1)}</div>
            <div className="pt-2 border-t border-slate-600 text-red-400 font-bold">
              최종 전투력: {powerB.toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cyan-900/30 rounded p-3 sm:p-4 text-xs sm:text-sm text-cyan-200">
        <p className="font-bold mb-2">🤝 팀워크의 중요성</p>
        <p>각 팀은 1-5명으로 구성 가능합니다. 팀워크가 높은 캐릭터들을 조합하면 시너지 보너스가 증가합니다!</p>
      </div>
    </div>
  );
}

// 산점도 (기존 유지)
function ScatterPlot({ characters }) {
  const [xAxis, setXAxis] = useState('magic');
  const [yAxis, setYAxis] = useState('grade');

  const axisOptions = [
    { value: 'magic', label: '마법력' },
    { value: 'wealth', label: '재력' },
    { value: 'grade', label: '성적' },
    { value: 'courage', label: '용기' },
    { value: 'teamwork', label: '팀워크' },
    { value: 'growth', label: '성장성' }
  ];

  const width = 500;
  const height = 450;
  const padding = 80;

  const houseColors = {
    '그리핀도르': '#dc2626',
    '슬리데린': '#10b981',
    '레이븐클로': '#3b82f6',
    '후플푸프': '#eab308',
    '소속 없음': '#8b5cf6'
  };

  return (
    <div className="bg-slate-800 rounded-lg p-3 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-emerald-400 mb-3 sm:mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">상관관계 산점도</span>
      </h3>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <label className="block text-xs sm:text-sm text-slate-400 mb-2">X축</label>
          <select
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            className="w-full bg-slate-700 text-white rounded px-2 sm:px-3 py-2 border border-slate-600 text-xs sm:text-sm"
          >
            {axisOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-xs sm:text-sm text-slate-400 mb-2">Y축</label>
          <select
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
            className="w-full bg-slate-700 text-white rounded px-2 sm:px-3 py-2 border border-slate-600 text-xs sm:text-sm"
          >
            {axisOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {[0, 25, 50, 75, 100].map(val => {
          const x = padding + (val / 100) * (width - 2 * padding);
          const y = height - padding - (val / 100) * (height - 2 * padding);
          return (
            <g key={val}>
              <line x1={x} y1={height - padding} x2={x} y2={padding} stroke="#475569" strokeWidth="1" opacity="0.2" />
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#475569" strokeWidth="1" opacity="0.2" />
              <text x={x} y={height - padding + 20} textAnchor="middle" fill="#94a3b8" fontSize="10">{val}</text>
              <text x={padding - 20} y={y} textAnchor="middle" fill="#94a3b8" fontSize="10">{val}</text>
            </g>
          );
        })}

        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#94a3b8" strokeWidth="2" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#94a3b8" strokeWidth="2" />

        {characters.map((char, i) => {
          const x = padding + (char[xAxis] / 100) * (width - 2 * padding);
          const y = height - padding - (char[yAxis] / 100) * (height - 2 * padding);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="6" fill={houseColors[char.house] || '#6366f1'} opacity="0.8" />
              <text x={x} y={y - 12} textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="600">
                {char.name}
              </text>
            </g>
          );
        })}

        <text x={width / 2} y={height - 10} textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="bold">
          {axisOptions.find(opt => opt.value === xAxis)?.label}
        </text>
        <text x={20} y={height / 2} textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="bold" transform={`rotate(-90, 20, ${height / 2})`}>
          {axisOptions.find(opt => opt.value === yAxis)?.label}
        </text>
      </svg>

      <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-4 text-xs sm:text-sm">
        {Object.entries(houseColors).map(([house, color]) => (
          <div key={house} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="text-slate-300">{house}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 히트맵 - 색상 그라디언트 (파랑→노랑→빨강)
function HouseHeatmap({ characters }) {
  const houses = ['그리핀도르', '슬리데린', '레이븐클로', '후플푸프'];
  const stats = ['magic', 'combat', 'courage', 'quidditch', 'teamwork', 'growth'];
  const statLabels = ['마법력', '결투', '용기', '쿼디치', '팀워크', '성장성'];

  const houseStats = houses.map(house => {
    const houseChars = characters.filter(c => c.house === house);
    return stats.map(stat => {
      const avg = houseChars.reduce((sum, c) => sum + c[stat], 0) / houseChars.length;
      return avg;
    });
  });

  // 히트맵 색상 함수: 0-100 값을 파랑→노랑→빨강으로 변환
  const getHeatmapColor = (value) => {
    const normalized = value / 100; // 0~1 사이 값
    
    if (normalized < 0.5) {
      // 0~50: 파랑 → 노랑
      const ratio = normalized * 2; // 0~1
      const r = Math.round(59 + (255 - 59) * ratio);
      const g = Math.round(130 + (223 - 130) * ratio);
      const b = Math.round(246 - 246 * ratio);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // 50~100: 노랑 → 빨강
      const ratio = (normalized - 0.5) * 2; // 0~1
      const r = 255;
      const g = Math.round(223 - 223 * ratio);
      const b = 0;
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  // 텍스트 색상 (가독성을 위해 중간 값에서 검정색으로 전환)
  const getTextColor = (value) => {
    return value > 40 && value < 75 ? '#000000' : '#ffffff';
  };

  const cellWidth = 80;
  const cellHeight = 40;

  return (
    <div className="bg-slate-800 rounded-lg p-3 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-orange-400 mb-3 sm:mb-4 flex items-center gap-2">
        <Award className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">기숙사별 능력치 히트맵</span>
      </h3>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${(stats.length + 1) * cellWidth} ${(houses.length + 1) * cellHeight + 40}`} className="w-full min-w-[500px]">
          {/* 컬럼 헤더 */}
          {statLabels.map((label, i) => (
            <text
              key={i}
              x={(i + 1) * cellWidth + cellWidth / 2}
              y={cellHeight / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#cbd5e1"
              fontSize="12"
              fontWeight="600"
            >
              {label}
            </text>
          ))}

          {/* 데이터 셀 */}
          {houses.map((house, rowIndex) => (
            <g key={house}>
              <text
                x={cellWidth / 2}
                y={(rowIndex + 1) * cellHeight + cellHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#cbd5e1"
                fontSize="12"
                fontWeight="600"
              >
                {house}
              </text>
              
              {houseStats[rowIndex].map((value, colIndex) => {
                const color = getHeatmapColor(value);
                const textColor = getTextColor(value);
                
                return (
                  <g key={colIndex}>
                    <rect
                      x={(colIndex + 1) * cellWidth}
                      y={(rowIndex + 1) * cellHeight}
                      width={cellWidth}
                      height={cellHeight}
                      fill={color}
                      stroke="#1e293b"
                      strokeWidth="2"
                    />
                    <text
                      x={(colIndex + 1) * cellWidth + cellWidth / 2}
                      y={(rowIndex + 1) * cellHeight + cellHeight / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={textColor}
                      fontSize="13"
                      fontWeight="bold"
                    >
                      {value.toFixed(0)}
                    </text>
                  </g>
                );
              })}
            </g>
          ))}

          {/* 색상 범례 */}
          <g transform={`translate(${cellWidth}, ${(houses.length + 1) * cellHeight + 15})`}>
            {[0, 25, 50, 75, 100].map((val, i) => {
              const x = i * ((stats.length * cellWidth) / 4);
              const color = getHeatmapColor(val);
              return (
                <g key={val}>
                  <rect
                    x={x}
                    y={0}
                    width={((stats.length * cellWidth) / 4)}
                    height={15}
                    fill={color}
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                  <text
                    x={x + ((stats.length * cellWidth) / 8)}
                    y={-3}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                  >
                    {val}
                  </text>
                </g>
              );
            })}
            <text
              x={-10}
              y={8}
              textAnchor="end"
              fill="#94a3b8"
              fontSize="10"
              fontWeight="600"
            >
              낮음
            </text>
            <text
              x={(stats.length * cellWidth) + 10}
              y={8}
              textAnchor="start"
              fill="#94a3b8"
              fontSize="10"
              fontWeight="600"
            >
              높음
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-4 text-xs sm:text-sm text-slate-300 bg-slate-700 rounded p-3">
        <p className="font-bold text-orange-400 mb-1">📊 히트맵 분석 가이드</p>
        <p className="mb-2">
          <span className="inline-block w-3 h-3 bg-blue-400 mr-1"></span>파란색 (낮음) → 
          <span className="inline-block w-3 h-3 bg-yellow-400 mx-1"></span>노란색 (중간) → 
          <span className="inline-block w-3 h-3 bg-red-500 mx-1"></span>빨간색 (높음)
        </p>
        <p>각 기숙사의 강점과 약점을 색상으로 한눈에 비교해보세요!</p>
      </div>
    </div>
  );
}

// 메인 App 컴포넌트
function App() {
  const [selectedHouse, setSelectedHouse] = useState('전체');
  const [selectedBlood, setSelectedBlood] = useState('전체');
  const [selectedCharacter, setSelectedCharacter] = useState(CHARACTERS[0]);
  const [activeTab, setActiveTab] = useState('radar');
  const [selectedYear, setSelectedYear] = useState(7);

  const filteredCharacters = useMemo(() => {
    return CHARACTERS.filter(char => {
      if (selectedHouse !== '전체' && char.house !== selectedHouse) return false;
      if (selectedBlood !== '전체' && char.blood !== selectedBlood) return false;
      return true;
    });
  }, [selectedHouse, selectedBlood]);

  const tabs = [
    { id: 'radar', name: '기본능력', icon: Target, color: 'amber' },
    { id: 'hidden', name: '숨겨진능력', icon: Heart, color: 'purple' },
    { id: 'growth', name: '성장분석', icon: Clock, color: 'cyan' },
    { id: 'scenario', name: '시나리오', icon: Zap, color: 'violet' },
    { id: 'team', name: '팀전투', icon: Users, color: 'cyan' },
    { id: 'scatter', name: '상관관계', icon: TrendingUp, color: 'emerald' },
    { id: 'heatmap', name: '히트맵', icon: Award, color: 'orange' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-gradient-to-r from-amber-600 via-red-600 to-purple-600 p-4 sm:p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <Wand2 className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold">호그와트 빅데이터 대시보드</h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-amber-100">중학생을 위한 데이터 리터러시 교육 플랫폼 • v3.0 최종판</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* 필터 */}
            <div className="bg-slate-800 rounded-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-amber-400 mb-3 sm:mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                필터
              </h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm text-slate-400 mb-2">기숙사</label>
                  <select
                    value={selectedHouse}
                    onChange={(e) => setSelectedHouse(e.target.value)}
                    className="w-full bg-slate-700 text-white rounded px-2 sm:px-3 py-2 border border-slate-600 text-sm"
                  >
                    {HOUSES.map(house => (
                      <option key={house} value={house}>{house}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm text-slate-400 mb-2">혈통</label>
                  <select
                    value={selectedBlood}
                    onChange={(e) => setSelectedBlood(e.target.value)}
                    className="w-full bg-slate-700 text-white rounded px-2 sm:px-3 py-2 border border-slate-600 text-sm"
                  >
                    {BLOOD_TYPES.map(blood => (
                      <option key={blood} value={blood}>{blood}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm text-slate-400 mb-2">학년 선택 ({selectedYear}학년)</label>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1학년</span>
                    <span>7학년</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 캐릭터 리스트 */}
            <div className="bg-slate-800 rounded-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-amber-400 mb-3 sm:mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                마법사 목록 ({filteredCharacters.length}명)
              </h2>
              
              <div className="space-y-2 max-h-64 sm:max-h-96 overflow-y-auto">
                {filteredCharacters.map(char => (
                  <button
                    key={char.name}
                    onClick={() => setSelectedCharacter(char)}
                    className={`w-full text-left p-2 sm:p-3 rounded transition ${
                      selectedCharacter.name === char.name
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    <div className="font-bold text-sm sm:text-base">{char.name}</div>
                    <div className="text-xs opacity-75">{char.house} • {char.blood}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 데이터 탐험 가이드 (학생용 간단 힌트) */}
            <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-lg p-4 sm:p-6 border-2 border-indigo-500">
              <h2 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 sm:mb-4 flex items-center gap-2">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
                데이터 탐험 가이드
              </h2>
              
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-black/30 rounded p-2 sm:p-3">
                  <div className="font-bold text-indigo-300 mb-1">💡 시작하기</div>
                  <p className="text-indigo-100">각 탭을 클릭해서 다양한 분석 방법을 탐험해보세요!</p>
                </div>
                
                <div className="bg-black/30 rounded p-2 sm:p-3">
                  <div className="font-bold text-indigo-300 mb-1">🔍 탐험 힌트</div>
                  <ul className="text-indigo-100 space-y-1 list-disc list-inside">
                    <li>가장 강한 캐릭터는 누구일까요?</li>
                    <li>숨겨진 능력을 찾아보세요</li>
                    <li>상황이 바뀌면 결과도 바뀝니다!</li>
                  </ul>
                </div>
                
                <div className="bg-black/30 rounded p-2 sm:p-3">
                  <div className="font-bold text-indigo-300 mb-1">🎯 도전 과제</div>
                  <p className="text-indigo-100">약한 캐릭터가 강한 캐릭터를 이기는 방법을 찾아보세요!</p>
                </div>

                <div className="bg-black/30 rounded p-2 sm:p-3">
                  <div className="font-bold text-indigo-300 mb-1">🤝 협력의 힘</div>
                  <p className="text-indigo-100">팀전투에서 나만의 최강 팀을 만들어보세요!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-4 sm:mb-6">
              <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-bold transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                        activeTab === tab.id
                          ? `bg-${tab.color}-600 text-white`
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="whitespace-nowrap">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              {activeTab === 'radar' && <RadarChart character={selectedCharacter} />}
              {activeTab === 'hidden' && <HiddenStatsRadar character={selectedCharacter} />}
              {activeTab === 'growth' && <GrowthChart selectedYear={selectedYear} selectedCharacter={selectedCharacter} />}
              {activeTab === 'scenario' && <ScenarioSimulator characters={filteredCharacters} />}
              {activeTab === 'team' && <TeamBattleSimulator characters={filteredCharacters} />}
              {activeTab === 'scatter' && <ScatterPlot characters={filteredCharacters} />}
              {activeTab === 'heatmap' && <HouseHeatmap characters={CHARACTERS} />}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-slate-800 mt-8 sm:mt-12 py-4 sm:py-6 text-center text-slate-400">
        <p className="text-xs sm:text-sm mb-2">🧙‍♂️ 호그와트 빅데이터 대시보드 v3.0 최종판</p>
        <p className="text-xs">✨ 자유 팀 구성 • 캐릭터별 상황 변수 • 완전 반응형 • 학생용 탐험 가이드</p>
        <p className="text-xs mt-1 text-slate-500">"데이터는 시작일 뿐, 맥락이 진실을 말한다"</p>
      </footer>
    </div>
  );
}

export default App;
