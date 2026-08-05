import { Line, LineChart, ResponsiveContainer, YAxis } from 'recharts'

interface MiniTrendCardProps {
  label: string
  unit: string
  value: number | string
  data: { value: number }[]
  color: string
}

export default function MiniTrendCard({ label, unit, value, data, color }: MiniTrendCardProps) {
  return (
    <div className="rounded-lg border border-border-gray bg-bg-white p-4 shadow-card">
      <p className="text-caption font-medium text-text-light">
        {label} <span className="text-text-light/70">{unit}</span>
      </p>
      <p className="mt-1 text-card-title text-primary-navy">{value}</p>
      <div className="mt-2 h-12 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 2, bottom: 0, left: 2 }}>
            <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
