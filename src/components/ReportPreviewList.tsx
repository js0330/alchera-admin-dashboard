import { AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react'
import type { Incident } from '../types'

interface ReportPreviewListProps {
  incidents: Incident[]
}

export default function ReportPreviewList({ incidents }: ReportPreviewListProps) {
  return (
    <div className="flex flex-col gap-4">
      {incidents.map((incident) => {
        const Icon = incident.level === 'danger' ? AlertTriangle : AlertCircle
        const iconClass = incident.level === 'danger' ? 'bg-status-danger/10 text-status-danger' : 'bg-status-caution/10 text-status-caution'
        return (
          <div key={incident.id} className="flex items-start gap-3">
            <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${iconClass}`}>
              <Icon size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold text-primary-navy">{incident.decision}</p>
              <p className="mt-0.5 text-base text-text-gray">{incident.action}</p>
              <p className="mt-0.5 flex items-center gap-1 text-caption text-text-light">
                <CheckCircle2 size={12} className="text-status-normal" />
                {incident.detectedAt}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
