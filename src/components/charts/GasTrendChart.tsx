import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { gasTrend, CO_THRESHOLD, RADON_THRESHOLD } from '../../data/airQuality'

const formatTooltipValue = (value: unknown, name: unknown) => {
  const v = Number(value) || 0
  if (name === 'CO') return [`${v} ppm`, name]
  return [`${v} Bq/㎥`, name]
}

export default function GasTrendChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={gasTrend} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E5F0" />
          <XAxis dataKey="time" tick={{ fontSize: 13, fill: '#595959' }} tickLine={false} axisLine={{ stroke: '#E0E5F0' }} />
          <YAxis
            yAxisId="co"
            tick={{ fontSize: 13, fill: '#595959' }}
            tickLine={false}
            axisLine={{ stroke: '#E0E5F0' }}
            width={48}
            label={{ value: 'CO (ppm)', angle: -90, position: 'insideLeft', style: { fontSize: 13, fill: '#595959' } }}
          />
          <YAxis
            yAxisId="radon"
            orientation="right"
            tick={{ fontSize: 13, fill: '#595959' }}
            tickLine={false}
            axisLine={{ stroke: '#E0E5F0' }}
            width={56}
            label={{ value: '라돈 (Bq/㎥)', angle: 90, position: 'insideRight', style: { fontSize: 13, fill: '#595959' } }}
          />
          <Tooltip
            formatter={formatTooltipValue as never}
            contentStyle={{ borderRadius: 8, borderColor: '#E0E5F0', fontSize: 14 }}
          />
          <Legend wrapperStyle={{ fontSize: 14, paddingTop: 12 }} />

          <ReferenceLine
            yAxisId="co"
            y={CO_THRESHOLD}
            stroke="#E84B55"
            strokeDasharray="4 4"
            label={{ value: `CO 기준 ${CO_THRESHOLD}ppm`, position: 'insideTopLeft', fill: '#E84B55', fontSize: 12 }}
          />
          <ReferenceLine
            yAxisId="radon"
            y={RADON_THRESHOLD}
            stroke="#F1A11D"
            strokeDasharray="4 4"
            label={{ value: `라돈 권고기준 ${RADON_THRESHOLD}`, position: 'insideBottomRight', fill: '#F1A11D', fontSize: 12 }}
          />

          <Line yAxisId="co" type="monotone" dataKey="co" name="CO" stroke="#1D4ED8" strokeWidth={2.5} dot={false} />
          <Line
            yAxisId="radon"
            type="monotone"
            dataKey="radon"
            name="라돈"
            stroke="#9DB2F0"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
