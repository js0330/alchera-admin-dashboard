import { useMemo, useState } from 'react'
import { LayoutGrid, Map } from 'lucide-react'
import ZoneCard from '../components/ZoneCard'
import FloorMapView from '../components/FloorMapView'
import Sheet from '../components/common/Sheet'
import ZoneDetailPanel from '../components/ZoneDetailPanel'
import { zones } from '../data/zones'
import type { Zone, ZoneStatus } from '../types'

type StatusFilter = 'all' | ZoneStatus
type ViewMode = 'map' | 'list'

const STATUS_OPTIONS: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'normal', label: '정상' },
  { key: 'caution', label: '주의' },
  { key: 'danger', label: '위험' },
]

export default function ZoneMonitoring() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('map')
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null)

  const filteredZones = useMemo(
    () => zones.filter((zone) => statusFilter === 'all' || zone.status === statusFilter),
    [statusFilter],
  )

  return (
    <div>
      <h1 className="text-page-title text-primary-navy">구역별 모니터링</h1>
      <p className="mt-2 text-base text-text-gray">
        전체 {zones.length}개 구역의 실시간 CCTV 화면과 공기질 상태를 확인하세요.
      </p>

      <div className="mt-8 flex items-center justify-between">
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

        <div className="flex gap-1 rounded-lg border border-border-gray bg-bg-panel p-1">
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-base font-medium transition-colors ${
              viewMode === 'map' ? 'bg-primary-blue text-white' : 'text-text-gray hover:text-primary-navy'
            }`}
          >
            <Map size={18} />
            지도뷰
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-base font-medium transition-colors ${
              viewMode === 'list' ? 'bg-primary-blue text-white' : 'text-text-gray hover:text-primary-navy'
            }`}
          >
            <LayoutGrid size={18} />
            목록뷰
          </button>
        </div>
      </div>

      <div className="mt-6">
        {viewMode === 'map' ? (
          <FloorMapView zones={filteredZones} onSelect={setSelectedZone} />
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {filteredZones.map((zone) => (
              <ZoneCard key={zone.id} zone={zone} onClick={() => setSelectedZone(zone)} />
            ))}
          </div>
        )}
      </div>

      {filteredZones.length === 0 && (
        <div className="mt-6 rounded-lg border border-dashed border-border-gray bg-bg-panel p-10 text-center text-base text-text-light">
          선택한 상태에 해당하는 구역이 없습니다.
        </div>
      )}

      <Sheet open={!!selectedZone} onClose={() => setSelectedZone(null)} title="구역 상세 정보">
        {selectedZone && <ZoneDetailPanel zone={selectedZone} />}
      </Sheet>
    </div>
  )
}
