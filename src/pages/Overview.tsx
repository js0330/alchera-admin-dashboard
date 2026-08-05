import { useMemo, useState } from 'react'
import { Fan, Radiation, TrendingUp } from 'lucide-react'
import Card from '../components/common/Card'
import StatusBadge from '../components/common/StatusBadge'
import DataTable, { type DataTableColumn } from '../components/common/DataTable'
import Sheet from '../components/common/Sheet'
import ZoneDetailPanel from '../components/ZoneDetailPanel'
import StatusSummaryCard from '../components/StatusSummaryCard'
import IsometricFloorMap from '../components/IsometricFloorMap'
import MiniTrendCard from '../components/charts/MiniTrendCard'
import InsightList, { type InsightItem } from '../components/InsightList'
import VentilationHeatmap from '../components/VentilationHeatmap'
import ReportPreviewList from '../components/ReportPreviewList'
import VentilationScheduleChart from '../components/charts/VentilationScheduleChart'
import { zones } from '../data/zones'
import { airQualityTrend, gasTrend, floorVentilationSchedule, RADON_THRESHOLD } from '../data/airQuality'
import { incidents } from '../data/incidents'
import type { Zone, ZoneStatus } from '../types'

const zoneCounts = zones.reduce(
  (acc, zone) => {
    acc[zone.status] += 1
    return acc
  },
  { normal: 0, caution: 0, danger: 0 } as Record<ZoneStatus, number>,
)

const pctNum = (count: number) => Math.round((count / zones.length) * 100)

const columns: DataTableColumn<Zone>[] = [
  { key: 'name', header: '구역명', render: (row) => <span className="font-medium text-primary-navy">{row.name}</span> },
  { key: 'status', header: '상태', render: (row) => <StatusBadge status={row.status} size="sm" /> },
  { key: 'co2', header: 'CO2', render: (row) => `${row.co2} ppm` },
  { key: 'pm25', header: 'PM2.5', render: (row) => `${row.pm25} ㎍/㎥` },
  { key: 'voc', header: 'VOC', render: (row) => `${row.voc.toFixed(2)} ppm` },
  { key: 'temp', header: '온도', render: (row) => `${row.temp}℃` },
  { key: 'humidity', header: '습도', render: (row) => `${row.humidity}%` },
  {
    key: 'ventilationOn',
    header: '환기',
    render: (row) => (
      <span className={row.ventilationOn ? 'font-medium text-primary-blue' : 'text-text-light'}>
        {row.ventilationOn ? '가동 중' : '정지'}
      </span>
    ),
  },
]

export default function Overview() {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null)

  const miniTrendData = useMemo(
    () => ({
      co: gasTrend.map((p) => ({ value: p.co })),
      radon: gasTrend.map((p) => ({ value: p.radon })),
      pm25: airQualityTrend.map((p) => ({ value: p.pm25 })),
      voc: airQualityTrend.map((p) => ({ value: p.voc * 10 })),
    }),
    [],
  )

  const insights: InsightItem[] = useMemo(() => {
    const highestCo2Zone = [...zones].sort((a, b) => b.co2 - a.co2)[0]
    const highestRadonZone = [...zones].sort((a, b) => b.radon - a.radon)[0]
    const ventilatingCount = zones.filter((z) => z.ventilationOn).length

    return [
      {
        icon: TrendingUp,
        iconClassName: 'bg-status-caution/10 text-status-caution',
        title: 'CO2 상승',
        description: `${highestCo2Zone.name} 농도가 평소 대비 상승했습니다.`,
      },
      {
        icon: Radiation,
        iconClassName: 'bg-status-caution/10 text-status-caution',
        title: '라돈 상승 감지',
        description: `${highestRadonZone.name} 라돈 농도가 권고기준(${RADON_THRESHOLD}Bq/㎥)을 초과했습니다.`,
      },
      {
        icon: Fan,
        iconClassName: 'bg-primary-blue/10 text-primary-blue',
        title: '환기 필요 구역 감지',
        description: `현재 ${ventilatingCount}개 구역에서 환기가 가동 중입니다.`,
      },
    ]
  }, [])

  const recentIncidents = incidents.slice(0, 3)

  return (
    <div>
      <h1 className="text-page-title text-primary-navy">통합 현황</h1>
      <p className="mt-2 text-base text-text-gray">전체 구역의 공기질 및 안전 상태를 한눈에 확인하세요.</p>

      <div className="mt-8 grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <StatusSummaryCard status="normal" count={zoneCounts.normal} percent={pctNum(zoneCounts.normal)} />
            <StatusSummaryCard status="caution" count={zoneCounts.caution} percent={pctNum(zoneCounts.caution)} />
            <StatusSummaryCard status="danger" count={zoneCounts.danger} percent={pctNum(zoneCounts.danger)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MiniTrendCard label="CO" unit="ppm" value={gasTrend[gasTrend.length - 1].co} data={miniTrendData.co} color="#22C55E" />
            <MiniTrendCard
              label="VOC"
              unit="ppb"
              value={airQualityTrend[airQualityTrend.length - 1].voc * 10}
              data={miniTrendData.voc}
              color="#1D4ED8"
            />
            <MiniTrendCard
              label="라돈"
              unit="Bq/㎥"
              value={gasTrend[gasTrend.length - 1].radon}
              data={miniTrendData.radon}
              color="#F1A11D"
            />
            <MiniTrendCard
              label="PM2.5"
              unit="㎍/㎥"
              value={airQualityTrend[airQualityTrend.length - 1].pm25}
              data={miniTrendData.pm25}
              color="#8B5CF6"
            />
          </div>
        </div>

        <Card title="구역별 지도뷰">
          <IsometricFloorMap zones={zones} onSelect={setSelectedZone} />
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-5">
        <Card title="AI 판단근거 요약">
          <InsightList items={insights} />
        </Card>
        <Card title="예측 환기 스케줄">
          <VentilationHeatmap schedules={floorVentilationSchedule} />
        </Card>
        <Card title="최근 자동조치 리포트">
          <ReportPreviewList incidents={recentIncidents} />
        </Card>
      </div>

      <Card title="예측 기반 환기 스케줄 (CO2)" className="mt-6">
        <VentilationScheduleChart />
      </Card>

      <Card title="구역별 공기질 현황" className="mt-6">
        <DataTable columns={columns} rows={zones} getRowKey={(row) => row.id} onRowClick={setSelectedZone} />
      </Card>

      <Sheet open={!!selectedZone} onClose={() => setSelectedZone(null)} title="구역 상세 정보">
        {selectedZone && <ZoneDetailPanel zone={selectedZone} />}
      </Sheet>
    </div>
  )
}
