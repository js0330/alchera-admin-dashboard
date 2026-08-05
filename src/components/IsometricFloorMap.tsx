import type { Zone, Floor } from '../types'

const FLOOR_ORDER: Floor[] = ['옥상', '4F', '3F', '2F', '1F', 'B1', 'B2']

const STATUS_FILL: Record<Zone['status'], string> = {
  normal: '#22C55E',
  caution: '#F1A11D',
  danger: '#E84B55',
}

interface IsometricFloorMapProps {
  zones: Zone[]
  onSelect: (zone: Zone) => void
}

function floorWorstStatus(items: Zone[]): Zone['status'] {
  if (items.some((z) => z.status === 'danger')) return 'danger'
  if (items.some((z) => z.status === 'caution')) return 'caution'
  return 'normal'
}

const SEVERITY: Record<Zone['status'], number> = { normal: 0, caution: 1, danger: 2 }

function mostUrgentZone(items: Zone[]): Zone {
  return items.reduce((worst, zone) => (SEVERITY[zone.status] > SEVERITY[worst.status] ? zone : worst), items[0])
}

export default function IsometricFloorMap({ zones, onSelect }: IsometricFloorMapProps) {
  const floors = FLOOR_ORDER.map((floor) => ({
    floor,
    items: zones.filter((zone) => zone.floor === floor),
  })).filter((group) => group.items.length > 0)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-3 py-2" style={{ perspective: '1200px' }}>
        <div
          className="flex flex-col gap-2"
          style={{ transform: 'rotateX(48deg) rotateZ(-38deg)', transformStyle: 'preserve-3d' }}
        >
          {floors.map(({ floor, items }, index) => {
            const worst = floorWorstStatus(items)
            return (
              <button
                key={floor}
                onClick={() => onSelect(mostUrgentZone(items))}
                className="group relative flex h-14 w-56 items-center justify-between rounded-md border-2 px-4 shadow-md transition-transform hover:-translate-y-1"
                style={{
                  backgroundColor: `${STATUS_FILL[worst]}26`,
                  borderColor: STATUS_FILL[worst],
                  transform: `translateZ(${index * 6}px)`,
                }}
              >
                <span className="text-base font-bold text-primary-navy">{floor}</span>
                <span className="text-caption font-semibold text-text-gray">{items.length}개 구역</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 text-caption text-text-light">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-status-normal" /> 정상
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-status-caution" /> 주의
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-status-danger" /> 위험
        </span>
      </div>
    </div>
  )
}
