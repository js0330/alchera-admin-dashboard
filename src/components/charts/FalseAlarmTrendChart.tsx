import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { ReportTrendPoint } from '../../types'

interface FalseAlarmTrendChartProps {
  data: ReportTrendPoint[]
}

export default function FalseAlarmTrendChart({ data }: FalseAlarmTrendChartProps) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E5F0" />
          <XAxis dataKey="period" tick={{ fontSize: 13, fill: '#595959' }} tickLine={false} axisLine={{ stroke: '#E0E5F0' }} />
          <YAxis
            tick={{ fontSize: 13, fill: '#595959' }}
            tickLine={false}
            axisLine={{ stroke: '#E0E5F0' }}
            width={48}
            domain={[0, 100]}
            unit="%"
          />
          <Tooltip
            formatter={(value: unknown) => [`${value}%`, '오탐 감소율']}
            contentStyle={{ borderRadius: 8, borderColor: '#E0E5F0', fontSize: 14 }}
          />
          <Line
            type="monotone"
            dataKey="falsePositiveReduction"
            name="오탐 감소율"
            stroke="#1D4ED8"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#1D4ED8' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
