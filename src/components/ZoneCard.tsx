import { Fan } from 'lucide-react'
import type { Zone } from '../types'
import StatusBadge from './common/StatusBadge'

interface ZoneCardProps {
  zone: Zone
  onClick: () => void
}

export default function ZoneCard({ zone, onClick }: ZoneCardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-lg border border-border-gray bg-bg-white text-left shadow-card transition-shadow hover:shadow-md"
    >
      <div className="relative h-40 overflow-hidden bg-bg-panel">
        <img
          src={zone.thumbnailUrl}
          alt={`${zone.name} CCTV 화면`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/70 via-transparent to-transparent" />
        <div className="absolute right-3 top-3">
          <StatusBadge status={zone.status} size="sm" solid />
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-primary-navy/80 px-2.5 py-1 text-caption font-medium text-white">
          번호판·인물 마스킹 처리됨
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-card-title text-primary-navy">{zone.name}</h3>
          {zone.ventilationOn && (
            <span className="flex flex-shrink-0 items-center gap-1 text-caption font-medium text-primary-blue">
              <Fan size={14} />
              환기 중
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-base text-text-gray">
          <span>CO2 {zone.co2}ppm</span>
          <span>PM2.5 {zone.pm25}㎍/㎥</span>
          <span>
            {zone.temp}℃ · {zone.humidity}%
          </span>
        </div>
        <p className="mt-auto text-caption text-text-light">최근 갱신 {zone.lastUpdated}</p>
      </div>
    </button>
  )
}
