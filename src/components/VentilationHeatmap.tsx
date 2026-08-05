import type { FloorSchedule, VentilationState } from '../types'
import { ventilationSchedule } from '../data/airQuality'

const STATE_CLASSES: Record<VentilationState, string> = {
  off: 'bg-bg-panel',
  on: 'bg-status-normal/60',
  strong: 'bg-status-danger/70',
  scheduled: 'bg-primary-blue/25',
}

const LEGEND: { state: VentilationState; label: string }[] = [
  { state: 'on', label: '정상 가동' },
  { state: 'strong', label: '가동 강함' },
  { state: 'off', label: '대기' },
  { state: 'scheduled', label: '예정' },
]

interface VentilationHeatmapProps {
  schedules: FloorSchedule[]
}

export default function VentilationHeatmap({ schedules }: VentilationHeatmapProps) {
  const times = ventilationSchedule.map((point) => point.time)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        {schedules.map((schedule) => (
          <div key={schedule.floor} className="flex items-center gap-2">
            <span className="w-8 flex-shrink-0 text-caption font-semibold text-text-gray">{schedule.floor}</span>
            <div className="grid flex-1 grid-cols-[repeat(13,minmax(0,1fr))] gap-0.5">
              {schedule.states.map((state, i) => (
                <div
                  key={i}
                  title={`${schedule.floor} · ${times[i]} · ${state}`}
                  className={`h-4 rounded-sm ${STATE_CLASSES[state]}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="ml-10 flex justify-between text-caption text-text-light">
        <span>{times[0]}</span>
        <span>{times[6]}</span>
        <span>{times[times.length - 1]}</span>
      </div>

      <div className="flex flex-wrap gap-3 text-caption text-text-light">
        {LEGEND.map((item) => (
          <span key={item.state} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-sm ${STATE_CLASSES[item.state]}`} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}
