import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { airQualityTrend, VOC_SCALE } from '../../data/airQuality'

const formatTooltipValue = (value: unknown, name: unknown) => {
  const v = Number(value) || 0
  if (name === 'VOC') return [`${(v / VOC_SCALE).toFixed(2)} ppm`, name]
  if (name === 'CO2') return [`${v} ppm`, name]
  return [`${v} ㎍/㎥`, name]
}

export default function AirQualityTrendChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={airQualityTrend} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E5F0" />
          <XAxis dataKey="time" tick={{ fontSize: 13, fill: '#595959' }} tickLine={false} axisLine={{ stroke: '#E0E5F0' }} />
          <YAxis
            yAxisId="co2"
            tick={{ fontSize: 13, fill: '#595959' }}
            tickLine={false}
            axisLine={{ stroke: '#E0E5F0' }}
            width={48}
            label={{ value: 'CO2 (ppm)', angle: -90, position: 'insideLeft', style: { fontSize: 13, fill: '#595959' } }}
          />
          <YAxis
            yAxisId="index"
            orientation="right"
            tick={{ fontSize: 13, fill: '#595959' }}
            tickLine={false}
            axisLine={{ stroke: '#E0E5F0' }}
            width={48}
            label={{ value: 'PM2.5 · VOC 지수', angle: 90, position: 'insideRight', style: { fontSize: 13, fill: '#595959' } }}
          />
          <Tooltip
            formatter={formatTooltipValue as never}
            contentStyle={{ borderRadius: 8, borderColor: '#E0E5F0', fontSize: 14 }}
          />
          <Legend wrapperStyle={{ fontSize: 14, paddingTop: 12 }} />
          <Line
            yAxisId="co2"
            type="monotone"
            dataKey="co2"
            name="CO2"
            stroke="#1D4ED8"
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            yAxisId="index"
            type="monotone"
            dataKey="pm25"
            name="PM2.5"
            stroke="#5B7FE8"
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            yAxisId="index"
            type="monotone"
            dataKey="voc"
            name="VOC"
            stroke="#9DB2F0"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
