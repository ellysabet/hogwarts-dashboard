import { useState, useMemo } from 'react';
import { Wand2, Swords, Target, TrendingUp, Users, Sparkles, BookOpen, Wind, Clock, Heart, Shield, TrendingDown, Award, Zap, Menu, X } from 'lucide-react';

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

const GROWTH_DATA = {
  '해리 포터': [
    { year: 1, magic: 60, combat: 50, courage: 70, darkArts: 0 },
    { year: 2, magic: 65, combat: 55, courage: 75, darkArts: 0 },
    { year: 3, magic: 70, combat: 60, courage: 80, darkArts: 0 },
    { year: 4, magic: 75, combat: 70, courage: 85, darkArts: 0 },
    { year: 5, magic: 80, combat: 75, courage: 90, darkArts: 0 },
    { year: 6, magic: 83, combat: 78, courage: 92, darkArts: 0 },
    { year: 7, magic: 85, combat: 80, courage: 95, darkArts: 0 }
  ],
  '볼드모트': [
    { year: 1, magic: 100, combat: 100, courage: 70, darkArts: 100 },
    { year: 2, magic: 100, combat: 100, courage: 70, darkArts: 100 },
    { year: 3, magic: 100, combat: 100, courage: 70, darkArts: 100 },
    { year: 4, magic: 100, combat: 100, courage: 70, darkArts: 100 },
    { year: 5, magic: 100, combat: 100, courage: 70, darkArts: 100 },
    { year: 6, magic: 100, combat: 100, courage: 70, darkArts: 100 },
    { year: 7, magic: 100, combat: 100, courage: 70, darkArts: 100 }
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

// 학년별 성장 차트
function GrowthChart({ selectedYear }) {
  const harryData = GROWTH_DATA['해리 포터'];
  const voldemortData = GROWTH_DATA['볼드모트'];
  
  const width = 600;
  const height = 350;
  const padding = 60;

  return (
    <div className="bg-slate-800 rounded-lg p-3 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-3 sm:mb-4 flex items-center gap-2">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">학년별 성장 곡선 (현재: {selectedYear}학년)</span>
      </h3>
      
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
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

        <path
          d={harryData.map((data, i) => {
            const x = padding + ((data.year - 1) / 6) * (width - 2 * padding);
            const y = height - padding - (data.magic / 100) * (height - 2 * padding);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
          }).join(' ')}
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
        />

        <path
          d={voldemortData.map((data, i) => {
            const x = padding + ((data.year - 1) / 6) * (width - 2 * padding);
            const y = height - padding - (data.magic / 100) * (height - 2 * padding);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
          }).join(' ')}
          fill="none"
          stroke="#dc2626"
          strokeWidth="3"
          strokeDasharray="5,5"
        />

        {(() => {
          const harryPoint = harryData[selectedYear - 1];
          const voldemortPoint = voldemortData[selectedYear - 1];
          const x = padding + ((selectedYear - 1) / 6) * (width - 2 * padding);
          const harryY = height - padding - (harryPoint.magic / 100) * (height - 2 * padding);
          const voldemortY = height - padding - (voldemortPoint.magic / 100) * (height - 2 * padding);

          return (
            <>
              <circle cx={x} cy={harryY} r="6" fill="#10b981" />
              <circle cx={x} cy={voldemortY} r="6" fill="#dc2626" />
              <line x1={x} y1={padding} x2={x} y2={height - padding} stroke="#fbbf24" strokeWidth="2" opacity="0.5" />
            </>
          );
        })()}

        <g transform={`translate(${width - 150}, 30)`}>
          <line x1="0" y1="0" x2="30" y2="0" stroke="#10b981" strokeWidth="3" />
          <text x="35" y="5" fill="#10b981" fontSize="13">해리 (성장중)</text>
          
          <line x1="0" y1="25" x2="30" y2="25" stroke="#dc2626" strokeWidth="3" strokeDasharray="5,5" />
          <text x="35" y="30" fill="#dc2626" fontSize="13">볼드모트 (정체)</text>
        </g>

        <text x={width / 2} y={height - 10} textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="bold">
          학년
        </text>
        <text x={20} y={height / 2} textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="bold" transform={`rotate(-90, 20, ${height / 2})`}>
          마법력
        </text>
      </svg>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
        <div className="bg-emerald-900/30 rounded p-3">
          <div className="text-emerald-400 font-bold mb-1">해리의 성장률</div>
          <div className="text-emerald-200">1학년: 60 → 7학년: 85</div>
          <div className="text-emerald-300 font-bold">+42% 성장! 📈</div>
        </div>
        <div className="bg-red-900/30 rounded p-3">
          <div className="text-red-400 font-bold mb-1">볼드모트의 성장률</div>
          <div className="text-red-200">1학년: 100 → 7학년: 100</div>
          <div className="text-red-300 font-bold">0% 성장 (정체)</div>
        </div>
      </div>
    </div>
  );
}

// 시나리오 시뮬레이터
function ScenarioSimulator({ characters }) {
  const [fighter1, setFighter1] = useState(characters[0]);
  const [fighter2, setFighter2] = useState(characters[3]);
  const [scenario, setScenario] = useState({
    friendship: false,
    mothersLove: false,
    horcrux: true,
    dumbledoreGuidance: false,
    crisis: false
  });

  const calculatePower = (char, isHarry) => {
    let basePower = char.magic * 0.4 + char.combat * 0.4 + char.courage * 0.2;
    
    if (isHarry && char.name === '해리 포터') {
      if (scenario.friendship) basePower += 30;
      if (scenario.mothersLove) basePower += 50;
      if (scenario.crisis) basePower += 25;
      if (scenario.dumbledoreGuidance) basePower += 15;
    }
    
    if (!isHarry && char.name === '볼드모트') {
      if (scenario.horcrux) basePower -= 30;
    }
    
    return basePower;
  };

  const power1 = calculatePower(fighter1, true);
  const power2 = calculatePower(fighter2, false);
  const total = power1 + power2;
  const winRate1 = (power1 / total * 100).toFixed(1);
  const winRate2 = (power2 / total * 100).toFixed(1);

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
            onChange={(e) => setFighter1(characters.find(c => c.name === e.target.value))}
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
            onChange={(e) => setFighter2(characters.find(c => c.name === e.target.value))}
            className="w-full bg-slate-700 text-white rounded px-2 sm:px-3 py-2 border border-slate-600 text-sm"
          >
            {characters.map(char => (
              <option key={char.name} value={char.name}>{char.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-slate-700 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
        <h4 className="font-bold text-amber-400 mb-3 text-sm sm:text-base">🎭 상황 변수 설정</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={scenario.friendship}
              onChange={(e) => setScenario({...scenario, friendship: e.target.checked})}
              className="w-4 h-4"
            />
            <span className="text-slate-200">우정의 힘 (+30)</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={scenario.mothersLove}
              onChange={(e) => setScenario({...scenario, mothersLove: e.target.checked})}
              className="w-4 h-4"
            />
            <span className="text-slate-200">릴리의 보호 (+50)</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={scenario.crisis}
              onChange={(e) => setScenario({...scenario, crisis: e.target.checked})}
              className="w-4 h-4"
            />
            <span className="text-slate-200">절대 위기 (+25)</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={scenario.dumbledoreGuidance}
              onChange={(e) => setScenario({...scenario, dumbledoreGuidance: e.target.checked})}
              className="w-4 h-4"
            />
            <span className="text-slate-200">덤블도어 지도 (+15)</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer col-span-1 sm:col-span-2">
            <input
              type="checkbox"
              checked={scenario.horcrux}
              onChange={(e) => setScenario({...scenario, horcrux: e.target.checked})}
              className="w-4 h-4"
            />
            <span className="text-slate-200">호크룩스 약점 (볼드모트 -30)</span>
          </label>
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
            {scenario.friendship && <div className="text-green-400">+ 우정: +30</div>}
            {scenario.mothersLove && <div className="text-pink-400">+ 릴리: +50</div>}
            {scenario.crisis && <div className="text-orange-400">+ 위기: +25</div>}
            {scenario.dumbledoreGuidance && <div className="text-blue-400">+ 덤블도어: +15</div>}
            <div className="pt-2 border-t border-slate-600 text-amber-400 font-bold">
              최종: {power1.toFixed(1)}
            </div>
          </div>
        </div>
        
        <div className="bg-slate-700 rounded p-3 sm:p-4">
          <div className="text-red-400 font-bold mb-2 sm:mb-3 text-sm sm:text-base truncate">{fighter2.name}</div>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-300">
            <div>기본: {(fighter2.magic * 0.4 + fighter2.combat * 0.4 + fighter2.courage * 0.2).toFixed(1)}</div>
            {scenario.horcrux && <div className="text-red-400">- 호크룩스: -30</div>}
            <div className="pt-2 border-t border-slate-600 text-red-400 font-bold">
              최종: {power2.toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      <div className={`text-center p-3 sm:p-4 rounded-lg ${
        power1 > power2 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
      }`}>
        <div className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
          🏆 {power1 > power2 ? fighter1.name : fighter2.name} 승리!
        </div>
        <div className="text-xs sm:text-sm">
          {power1 > power2 
            ? '데이터 너머의 힘이 승리를 가져왔습니다!' 
            : '표면적 능력이 더 강합니다.'}
        </div>
      </div>

      <div className="mt-4 bg-violet-900/30 rounded p-3 text-xs sm:text-sm text-violet-200">
        <p className="font-bold mb-2">💡 데이터 리터러시 포인트</p>
        <p>영화에서 해리가 이긴 이유: 숨겨진 변수들(사랑, 우정, 희생)이 측정 가능한 능력치보다 더 중요했기 때문입니다.</p>
      </div>
    </div>
  );
}

// 팀 전투 시뮬레이터 (간소화)
function TeamBattleSimulator({ characters }) {
  const [teamA] = useState([characters[0], characters[1], characters[2]]);
  const [teamB] = useState([characters[3]]);
  
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

  return (
    <div className="bg-slate-800 rounded-lg p-3 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-3 sm:mb-4 flex items-center gap-2">
        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">팀 전투 시뮬레이터</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div>
          <h4 className="font-bold text-amber-400 mb-3 text-sm sm:text-base">팀 A (총 {teamA.length}명)</h4>
          <div className="space-y-2">
            {teamA.map(char => (
              <div key={char.name} className="bg-slate-700 rounded p-2 text-xs sm:text-sm truncate">
                {char.name} (팀워크: {char.teamwork})
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-red-400 mb-3 text-sm sm:text-base">팀 B (총 {teamB.length}명)</h4>
          <div className="space-y-2">
            {teamB.map(char => (
              <div key={char.name} className="bg-slate-700 rounded p-2 text-xs sm:text-sm truncate">
                {char.name} (팀워크: {char.teamwork})
              </div>
            ))}
          </div>
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

      <div className="bg-cyan-900/30 rounded p-3 sm:p-4 text-xs sm:text-sm text-cyan-200">
        <p className="font-bold mb-2">🤝 팀워크의 중요성</p>
        <p>개인전에서는 볼드모트가 강하지만, 팀전에서는 해리+헤르미온느+론의 시너지가 압도합니다!</p>
      </div>
    </div>
  );
}

// 산점도 (간소화)
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

// 기숙사 히트맵 (간소화)
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

  const cellWidth = 80;
  const cellHeight = 40;

  return (
    <div className="bg-slate-800 rounded-lg p-3 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-orange-400 mb-3 sm:mb-4 flex items-center gap-2">
        <Award className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">기숙사별 능력치 히트맵</span>
      </h3>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${(stats.length + 1) * cellWidth} ${(houses.length + 1) * cellHeight + 20}`} className="w-full min-w-[500px]">
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
                const intensity = value / 100;
                const color = `rgba(245, 158, 11, ${intensity})`;
                
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
                      fill="#fff"
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
        </svg>
      </div>

      <div className="mt-4 text-xs sm:text-sm text-slate-300 bg-slate-700 rounded p-3">
        <p className="font-bold text-orange-400 mb-1">📊 분석 포인트</p>
        <p>색이 진할수록 높은 수치입니다. 각 기숙사의 강점과 약점을 한눈에 비교해보세요!</p>
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      {/* 헤더 */}
      <header className="bg-gradient-to-r from-amber-600 via-red-600 to-purple-600 p-4 sm:p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <Wand2 className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold">호그와트 빅데이터 대시보드</h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-amber-100">중학생을 위한 고급 데이터 리터러시 교육 플랫폼</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* 좌측 패널 */}
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

            {/* 심화 분석 미션 */}
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-4 sm:p-6 border-2 border-purple-500">
              <h2 className="text-lg sm:text-xl font-bold text-purple-300 mb-3 sm:mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                심화 분석 미션
              </h2>
              
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="bg-black/30 rounded p-2 sm:p-3">
                  <div className="font-bold text-purple-300 mb-1">🎯 미션 1</div>
                  <p className="text-purple-100">재력과 성적의 상관관계를 분석하세요.</p>
                </div>
                
                <div className="bg-black/30 rounded p-2 sm:p-3">
                  <div className="font-bold text-purple-300 mb-1">⚔️ 미션 2</div>
                  <p className="text-purple-100">왜 데이터상으로는 볼드모트가 이기는데 해리가 이겼을까요?</p>
                </div>
                
                <div className="bg-black/30 rounded p-2 sm:p-3">
                  <div className="font-bold text-purple-300 mb-1">📈 미션 3</div>
                  <p className="text-purple-100">성장 곡선을 보고 해리의 잠재력을 분석해보세요.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 우측 패널 - 탭 뷰어 */}
          <div className="lg:col-span-2">
            {/* 탭 메뉴 - 모바일에서는 스크롤 가능 */}
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

            {/* 탭 컨텐츠 */}
            <div>
              {activeTab === 'radar' && <RadarChart character={selectedCharacter} />}
              {activeTab === 'hidden' && <HiddenStatsRadar character={selectedCharacter} />}
              {activeTab === 'growth' && <GrowthChart selectedYear={selectedYear} />}
              {activeTab === 'scenario' && <ScenarioSimulator characters={filteredCharacters} />}
              {activeTab === 'team' && <TeamBattleSimulator characters={filteredCharacters} />}
              {activeTab === 'scatter' && <ScatterPlot characters={filteredCharacters} />}
              {activeTab === 'heatmap' && <HouseHeatmap characters={CHARACTERS} />}
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-slate-800 mt-8 sm:mt-12 py-4 sm:py-6 text-center text-slate-400">
        <p className="text-xs sm:text-sm mb-2">🧙‍♂️ 호그와트 빅데이터 대시보드 Pro</p>
        <p className="text-xs">✨ 7개 분석 모드 • 모바일/태블릿/데스크톱 최적화</p>
      </footer>
    </div>
  );
}

export default App;
