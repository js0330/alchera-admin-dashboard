import type { ReactNode } from 'react'

interface KpiCardProps {
  label: string
  value: ReactNode
  unit?: string
  sublabel?: string
  accentClassName?: string
  badge?: ReactNode
}

export default function KpiCard({ label, value, unit, sublabel, accentClassName, badge }: KpiCardProps) {
  return (
    <div className="flex-1 rounded-lg border border-border-gray bg-bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-caption font-medium uppercase tracking-wide text-text-light">{label}</p>
        {badge}
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className={`text-kpi whitespace-nowrap ${accentClassName ?? 'text-primary-navy'}`}>{value}</span>
        {unit && <span className="text-base font-medium text-text-gray">{unit}</span>}
      </div>
      {sublabel && <p className="mt-1 text-base text-text-gray">{sublabel}</p>}
    </div>
  )
}
