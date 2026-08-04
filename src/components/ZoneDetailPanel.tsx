import { useState } from 'react'
import { ShieldCheck, Wind, Sparkles } from 'lucide-react'
import type { Zone } from '../types'
import StatusBadge from './common/StatusBadge'

interface ZoneDetailPanelProps {
  zone: Zone
}

const VENT_LEVELS = [
  { key: 'low', label: '약', minutes: 15 },
  { key: 'mid', label: '중', minutes: 30 },
  { key: 'high', label: '강', minutes: 45 },
] as const

export default function ZoneDetailPanel({ zone }: ZoneDetailPanelProps) {
  const defaultLevel = zone.status === 'danger' ? 'high' : zone.status === 'caution' ? 'mid' : 'low'
  const [level, setLevel] = useState<(typeof VENT_LEVELS)[number]['key']>(defaultLevel)
  const activeLevel = VENT_LEVELS.find((item) => item.key === level)!

  return (
    <div className="flex flex-col gap-6">
      <div className="relative h-48 overflow-hidden rounded-lg bg-bg-panel">
        <img
          src={zone.thumbnailUrl}
          alt={`${zone.name} CCTV 화면`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/70 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full bg-primary-navy/80 px-3 py-1.5 text-caption font-medium text-white">
          번호판·인물 자동 마스킹 처리됨
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-card-title text-primary-navy">{zone.name}</h3>
          <p className="mt-1 text-base text-text-gray">현재 상태</p>
        </div>
        <StatusBadge status={zone.status} size="lg" />
      </div>

      <div className="rounded-lg border border-border-gray bg-bg-panel p-5">
        <div className="flex items-center gap-2 text-base font-semibold text-primary-navy">
          <Sparkles size={18} className="text-primary-blue" />
          AI 분석 결과
        </div>
        <p className="mt-2 text-base leading-relaxed text-text-gray">{zone.aiAnalysis}</p>
      </div>

      <div className="rounded-lg border border-border-gray p-5">
        <div className="flex items-center gap-2 text-base font-semibold text-primary-navy">
          <Wind size={18} className="text-primary-blue" />
          환기 권고
        </div>
        <p className="mt-2 text-base leading-relaxed text-text-gray">{zone.ventRecommendation}</p>
      </div>

      <div className="rounded-lg border border-border-gray p-5">
        <p className="text-base font-semibold text-primary-navy">환기 설정</p>
        <div className="mt-3 flex gap-2">
          {VENT_LEVELS.map((item) => (
            <button
              key={item.key}
              onClick={() => setLevel(item.key)}
              className={`flex-1 rounded-lg border px-4 py-2.5 text-base font-medium transition-colors ${
                level === item.key
                  ? 'border-primary-blue bg-primary-blue text-white'
                  : 'border-border-gray bg-bg-white text-text-gray hover:bg-bg-panel'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-base text-text-gray">
          권고 가동 시간: <span className="font-semibold text-primary-navy">{activeLevel.minutes}분</span>
        </p>
      </div>

      <div className="flex items-center gap-2 text-base text-text-light">
        <ShieldCheck size={16} />
        최근 데이터 갱신: {zone.lastUpdated}
      </div>
    </div>
  )
}
