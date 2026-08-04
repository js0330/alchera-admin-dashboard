import type { ReportMetric, ReportTrendPoint } from '../types'

export const reportMetrics: ReportMetric[] = [
  { id: 'accuracy', label: '위험 감지 정확도', value: '95%+', sublabel: '목표 대비 초과 달성' },
  { id: 'false-alarm', label: '오탐 알람 감소', value: '80%↓', sublabel: '도입 이전 대비' },
  { id: 'response-time', label: '현장 대응 소요시간', value: '50%↓', sublabel: '평균 대응 시간 단축' },
  { id: 'report-gen', label: '자동 조치리포트 생성', value: '30초', sublabel: '이내 자동 생성' },
  { id: 'sla-remote', label: '장애 대응 SLA · 원격', value: '4h', sublabel: '원격 조치 기준' },
  { id: 'sla-onsite', label: '장애 대응 SLA · 현장', value: '24h', sublabel: '현장 조치 기준' },
]

export const weeklyTrend: ReportTrendPoint[] = [
  { period: '1주차', falsePositiveReduction: 42 },
  { period: '2주차', falsePositiveReduction: 51 },
  { period: '3주차', falsePositiveReduction: 58 },
  { period: '4주차', falsePositiveReduction: 63 },
  { period: '5주차', falsePositiveReduction: 69 },
  { period: '6주차', falsePositiveReduction: 74 },
  { period: '7주차', falsePositiveReduction: 78 },
  { period: '8주차', falsePositiveReduction: 80 },
]

export const monthlyTrend: ReportTrendPoint[] = [
  { period: '1월', falsePositiveReduction: 35 },
  { period: '2월', falsePositiveReduction: 44 },
  { period: '3월', falsePositiveReduction: 52 },
  { period: '4월', falsePositiveReduction: 61 },
  { period: '5월', falsePositiveReduction: 68 },
  { period: '6월', falsePositiveReduction: 74 },
  { period: '7월', falsePositiveReduction: 80 },
]
