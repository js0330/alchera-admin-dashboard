export type ZoneStatus = 'normal' | 'caution' | 'danger'

export type ZoneCategory = 'parking' | 'mechanical' | 'entrance' | 'office' | 'storage'

export interface Zone {
  id: string
  name: string
  category: ZoneCategory
  status: ZoneStatus
  co2: number
  pm25: number
  voc: number
  temp: number
  humidity: number
  lastUpdated: string
  aiAnalysis: string
  ventRecommendation: string
  thumbnailUrl: string
}

export interface AirQualityTrendPoint {
  time: string
  co2: number
  pm25: number
  voc: number
}

export interface VentilationSchedulePoint {
  time: string
  observed: number | null
  predicted: number | null
  isNow?: boolean
  isVentilationStart?: boolean
}

export type IncidentLevel = 'caution' | 'danger'

export interface Incident {
  id: string
  code: string
  level: IncidentLevel
  levelLabel: string
  date: string
  detectedAt: string
  judgedAt: string
  respondedAt: string
  resolvedAt: string
  values: {
    co: number
    pm25: number
    vehicles: number
  }
  decision: string
  action: string
  result: string
}

export interface ReportMetric {
  id: string
  label: string
  value: string
  sublabel?: string
}

export interface ReportTrendPoint {
  period: string
  falsePositiveReduction: number
}
