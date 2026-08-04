import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CO2_THRESHOLD, ventilationSchedule } from '../../data/airQuality'

const ventilationStartPoint = ventilationSchedule.find((point) => point.isVentilationStart)

export default function VentilationScheduleChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={ventilationSchedule} margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E5F0" />
          <XAxis dataKey="time" tick={{ fontSize: 13, fill: '#595959' }} tickLine={false} axisLine={{ stroke: '#E0E5F0' }} />
          <YAxis
            tick={{ fontSize: 13, fill: '#595959' }}
            tickLine={false}
            axisLine={{ stroke: '#E0E5F0' }}
            width={48}
            domain={[400, 900]}
          />
          <Tooltip
            formatter={((value: unknown, name: unknown) => [`${value} ppm`, name]) as never}
            contentStyle={{ borderRadius: 8, borderColor: '#E0E5F0', fontSize: 14 }}
          />
          <Legend wrapperStyle={{ fontSize: 14, paddingTop: 12 }} />

          <ReferenceLine
            y={CO2_THRESHOLD}
            stroke="#E84B55"
            strokeWidth={2}
            label={{ value: `임계치 ${CO2_THRESHOLD}ppm`, position: 'insideTopRight', fill: '#E84B55', fontSize: 13 }}
          />
          <ReferenceLine
            x="NOW"
            stroke="#000038"
            strokeDasharray="4 4"
            label={{ value: 'NOW', position: 'top', fill: '#000038', fontSize: 13, fontWeight: 600 }}
          />

          <Line
            type="monotone"
            dataKey="observed"
            name="관측 농도"
            stroke="#1D4ED8"
            strokeWidth={2.5}
            dot={false}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="predicted"
            name="예측 농도"
            stroke="#1D4ED8"
            strokeWidth={2.5}
            strokeDasharray="6 5"
            dot={false}
            connectNulls
          />

          {ventilationStartPoint && (
            <ReferenceDot
              x={ventilationStartPoint.time}
              y={ventilationStartPoint.predicted ?? 0}
              r={7}
              fill="#22C55E"
              stroke="#FFFFFF"
              strokeWidth={2}
              label={{ value: '환기 시작 권장', position: 'top', fill: '#22C55E', fontSize: 13, fontWeight: 600 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
