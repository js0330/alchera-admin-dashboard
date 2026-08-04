import { Car, Wind, ClipboardCheck, CheckCircle2 } from 'lucide-react'
import type { Incident } from '../types'

interface IncidentCardProps {
  incident: Incident
}

const badgeClasses: Record<Incident['level'], string> = {
  caution: 'bg-status-caution/10 text-status-caution',
  danger: 'bg-status-danger/10 text-status-danger',
}

const TIMELINE_STEPS = (incident: Incident) => [
  { label: '감지', time: incident.detectedAt },
  { label: '판단', time: incident.judgedAt },
  { label: '대응', time: incident.respondedAt },
]

export default function IncidentCard({ incident }: IncidentCardProps) {
  return (
    <div className="rounded-lg border border-border-gray bg-bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-card-title text-primary-navy">Incident #{incident.code}</h3>
        <span className={`rounded-full px-3.5 py-1.5 text-base font-semibold ${badgeClasses[incident.level]}`}>
          {incident.levelLabel}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-caption font-semibold uppercase tracking-wide text-text-light">WHEN</p>
        <div className="mt-2 flex items-center gap-3">
          {TIMELINE_STEPS(incident).map((step, idx) => (
            <div key={step.label} className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-base font-semibold text-primary-navy">{step.label}</span>
                <span className="text-base text-text-gray">{step.time}</span>
              </div>
              {idx < 2 && <div className="h-px w-10 bg-border-gray" />}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 rounded-lg bg-bg-panel p-4">
        <p className="text-caption font-semibold uppercase tracking-wide text-text-light">VALUES</p>
        <div className="flex w-full flex-wrap gap-x-8 gap-y-1 text-base text-primary-navy">
          <span>CO {incident.values.co}ppm</span>
          <span>PM2.5 {incident.values.pm25}㎍/㎥</span>
          <span className="flex items-center gap-1.5">
            <Car size={16} className="text-text-light" />
            Vehicles {incident.values.vehicles}
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-start gap-2.5">
          <ClipboardCheck size={18} className="mt-0.5 flex-shrink-0 text-primary-blue" />
          <p className="text-base text-text-gray">
            <span className="font-semibold text-primary-navy">DECISION</span> · {incident.decision}
          </p>
        </div>
        <div className="flex items-start gap-2.5">
          <Wind size={18} className="mt-0.5 flex-shrink-0 text-primary-blue" />
          <p className="text-base text-text-gray">
            <span className="font-semibold text-primary-navy">ACTION</span> · {incident.action}
          </p>
        </div>
        <div className="flex items-start gap-2.5">
          <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-status-normal" />
          <p className="text-base text-text-gray">
            <span className="font-semibold text-primary-navy">RESULT</span> · {incident.result}
          </p>
        </div>
      </div>
    </div>
  )
}
