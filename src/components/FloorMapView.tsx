import type { Zone, Floor } from '../types'
import StatusBadge from './common/StatusBadge'
import { Fan } from 'lucide-react'

const FLOOR_ORDER: Floor[] = ['옥상', '4F', '3F', '2F', '1F', 'B1', 'B2']

const STATUS_TILE_CLASSES: Record<Zone['status'], string> = {
  normal: 'border-status-normal/40 bg-status-normal/10 hover:bg-status-normal/20',
  caution: 'border-status-caution/40 bg-status-caution/10 hover:bg-status-caution/20',
  danger: 'border-status-danger/40 bg-status-danger/10 hover:bg-status-danger/20',
}

interface FloorMapViewProps {
  zones: Zone[]
  onSelect: (zone: Zone) => void
}

export default function FloorMapView({ zones, onSelect }: FloorMapViewProps) {
  const floors = FLOOR_ORDER.map((floor) => ({
    floor,
    items: zones.filter((zone) => zone.floor === floor),
  })).filter((group) => group.items.length > 0)

  return (
    <div className="flex flex-col gap-3">
      {floors.map(({ floor, items }) => (
        <div key={floor} className="flex items-stretch gap-4 rounded-lg border border-border-gray bg-bg-white p-4">
          <div className="flex w-16 flex-shrink-0 items-center justify-center rounded-md bg-bg-panel text-card-title text-primary-navy">
            {floor}
          </div>
          <div className="grid flex-1 grid-cols-4 gap-3">
            {items.map((zone) => (
              <button
                key={zone.id}
                onClick={() => onSelect(zone)}
                className={`flex flex-col items-start gap-1.5 rounded-lg border-2 p-3 text-left transition-colors ${STATUS_TILE_CLASSES[zone.status]}`}
              >
                <div className="flex w-full items-center justify-between gap-1">
                  <span className="text-base font-semibold text-primary-navy">{zone.name}</span>
                  {zone.ventilationOn && <Fan size={14} className="flex-shrink-0 text-primary-blue" />}
                </div>
                <StatusBadge status={zone.status} size="sm" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
