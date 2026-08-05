import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react'
import type { ZoneStatus } from '../types'

interface StatusSummaryCardProps {
  status: ZoneStatus
  count: number
  percent: number
}

const CONFIG: Record<ZoneStatus, { label: string; icon: typeof ShieldCheck; text: string; bg: string; bar: string }> = {
  normal: { label: '정상', icon: ShieldCheck, text: 'text-status-normal', bg: 'bg-status-normal/10', bar: 'bg-status-normal' },
  caution: {
    label: '주의',
    icon: AlertTriangle,
    text: 'text-status-caution',
    bg: 'bg-status-caution/10',
    bar: 'bg-status-caution',
  },
  danger: { label: '위험', icon: ShieldAlert, text: 'text-status-danger', bg: 'bg-status-danger/10', bar: 'bg-status-danger' },
}

export default function StatusSummaryCard({ status, count, percent }: StatusSummaryCardProps) {
  const config = CONFIG[status]
  const Icon = config.icon

  return (
    <div className="flex-1 rounded-lg border border-border-gray bg-bg-white p-5 shadow-card">
      <div className="flex items-center gap-3">
        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${config.bg}`}>
          <Icon size={26} className={config.text} />
        </div>
        <div>
          <p className={`text-kpi ${config.text}`}>{count}</p>
          <p className="text-caption text-text-light">{config.label} 구역</p>
        </div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-bg-panel">
        <div className={`h-full rounded-full ${config.bar}`} style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-1.5 text-caption text-text-light">{percent}%</p>
    </div>
  )
}
