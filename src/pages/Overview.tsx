import { useMemo, useState } from 'react'
import Card from '../components/common/Card'
import KpiCard from '../components/common/KpiCard'
import StatusBadge from '../components/common/StatusBadge'
import DataTable, { type DataTableColumn } from '../components/common/DataTable'
import Sheet from '../components/common/Sheet'
import ZoneDetailPanel from '../components/ZoneDetailPanel'
import AirQualityTrendChart from '../components/charts/AirQualityTrendChart'
import VentilationScheduleChart from '../components/charts/VentilationScheduleChart'
import { zones } from '../data/zones'
import type { Zone, ZoneStatus } from '../types'

const zoneCounts = zones.reduce(
  (acc, zone) => {
    acc[zone.status] += 1
    return acc
  },
  { normal: 0, caution: 0, danger: 0 } as Record<ZoneStatus, number>,
)

const pct = (count: number) => `${((count / zones.length) * 100).toFixed(1)}%`

const columns: DataTableColumn<Zone>[] = [
  { key: 'name', header: '구역명', render: (row) => <span className="font-medium text-primary-navy">{row.name}</span> },
  { key: 'status', header: '상태', render: (row) => <StatusBadge status={row.status} size="sm" /> },
  { key: 'co2', header: 'CO2', render: (row) => `${row.co2} ppm` },
  { key: 'pm25', header: 'PM2.5', render: (row) => `${row.pm25} ㎍/㎥` },
  { key: 'voc', header: 'VOC', render: (row) => `${row.voc.toFixed(2)} ppm` },
  { key: 'temp', header: '온도', render: (row) => `${row.temp}℃` },
  { key: 'humidity', header: '습도', render: (row) => `${row.humidity}%` },
]

export default function Overview() {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null)

  const airQualityCards = useMemo(
    () => [
      { label: 'CO2', value: '742', unit: 'ppm', status: 'caution' as ZoneStatus },
      { label: 'PM2.5', value: '18', unit: '㎍/㎥', status: 'normal' as ZoneStatus },
      { label: 'VOC', value: '0.32', unit: 'ppm', status: 'normal' as ZoneStatus },
      { label: '온도·습도', value: '24℃/48%', unit: '', status: 'normal' as ZoneStatus },
    ],
    [],
  )

  return (
    <div>
      <h1 className="text-page-title text-primary-navy">통합 현황</h1>
      <p className="mt-2 text-base text-text-gray">전체 구역의 공기질 및 안전 상태를 한눈에 확인하세요.</p>

      <div className="mt-8 flex gap-5">
        <KpiCard label="전체 구역" value={zones.length} sublabel="모니터링 중인 구역" />
        <KpiCard
          label="정상"
          value={zoneCounts.normal}
          sublabel={pct(zoneCounts.normal)}
          accentClassName="text-status-normal"
        />
        <KpiCard
          label="주의"
          value={zoneCounts.caution}
          sublabel={pct(zoneCounts.caution)}
          accentClassName="text-status-caution"
        />
        <KpiCard
          label="위험"
          value={zoneCounts.danger}
          sublabel={pct(zoneCounts.danger)}
          accentClassName="text-status-danger"
        />
      </div>

      <div className="mt-6 flex gap-5">
        {airQualityCards.map((card) => (
          <KpiCard
            key={card.label}
            label={card.label}
            value={card.value}
            unit={card.unit}
            badge={<StatusBadge status={card.status} size="sm" />}
          />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-5">
        <Card title="24시간 공기질 추이">
          <AirQualityTrendChart />
        </Card>
        <Card title="예측 기반 환기 스케줄">
          <VentilationScheduleChart />
        </Card>
      </div>

      <Card title="구역별 공기질 현황" className="mt-6">
        <DataTable columns={columns} rows={zones} getRowKey={(row) => row.id} onRowClick={setSelectedZone} />
      </Card>

      <Sheet open={!!selectedZone} onClose={() => setSelectedZone(null)} title="구역 상세 정보">
        {selectedZone && <ZoneDetailPanel zone={selectedZone} />}
      </Sheet>
    </div>
  )
}
