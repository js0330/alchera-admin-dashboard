import { useMemo, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import IncidentCard from '../components/IncidentCard'
import { incidents } from '../data/incidents'
import type { IncidentLevel } from '../types'

type StatusFilter = 'all' | IncidentLevel
type PeriodFilter = 'today' | '7d' | 'all'

const STATUS_OPTIONS: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'caution', label: '주의' },
  { key: 'danger', label: '위험' },
]

const PERIOD_OPTIONS: { key: PeriodFilter; label: string }[] = [
  { key: 'today', label: '오늘' },
  { key: '7d', label: '최근 7일' },
  { key: 'all', label: '전체 기간' },
]

const TODAY = '2026-08-04'

export default function Incidents() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('7d')

  const filtered = useMemo(() => {
    return incidents.filter((incident) => {
      if (statusFilter !== 'all' && incident.level !== statusFilter) return false
      if (periodFilter === 'today' && incident.date !== TODAY) return false
      return true
    })
  }, [statusFilter, periodFilter])

  return (
    <div>
      <h1 className="text-page-title text-primary-navy">이상 징후</h1>
      <p className="mt-2 text-base text-text-gray">감지된 이상 징후 이벤트와 대응 이력을 확인하세요.</p>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-2">
          {PERIOD_OPTIONS.map((option) => (
            <button
              key={option.key}
              onClick={() => setPeriodFilter(option.key)}
              className={`rounded-lg border px-4 py-2.5 text-base font-medium transition-colors ${
                periodFilter === option.key
                  ? 'border-primary-blue bg-primary-blue text-white'
                  : 'border-border-gray bg-bg-white text-text-gray hover:bg-bg-panel'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.key}
              onClick={() => setStatusFilter(option.key)}
              className={`rounded-lg border px-4 py-2.5 text-base font-medium transition-colors ${
                statusFilter === option.key
                  ? 'border-primary-navy bg-primary-navy text-white'
                  : 'border-border-gray bg-bg-white text-text-gray hover:bg-bg-panel'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {filtered.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
        {filtered.length === 0 && (
          <div className="rounded-lg border border-dashed border-border-gray bg-bg-panel p-10 text-center text-base text-text-light">
            선택한 조건에 해당하는 이상 징후가 없습니다.
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center gap-2.5 rounded-lg bg-bg-panel px-5 py-4 text-base text-text-gray">
        <ShieldCheck size={18} className="flex-shrink-0 text-primary-blue" />
        모든 이벤트는 대응 근거와 함께 자동 아카이빙되어 사후 감사·학습 데이터로 활용됩니다.
      </div>
    </div>
  )
}
