import type { AirQualityTrendPoint, GasTrendPoint, VentilationSchedulePoint } from '../types'

export const airQualityTrend: AirQualityTrendPoint[] = [
  { time: '12:00', co2: 560, pm25: 14, voc: 22 },
  { time: '14:00', co2: 610, pm25: 16, voc: 25 },
  { time: '16:00', co2: 705, pm25: 19, voc: 30 },
  { time: '18:00', co2: 742, pm25: 21, voc: 32 },
  { time: '20:00', co2: 688, pm25: 18, voc: 28 },
  { time: '22:00', co2: 615, pm25: 15, voc: 24 },
  { time: '00:00', co2: 540, pm25: 12, voc: 19 },
  { time: '02:00', co2: 498, pm25: 10, voc: 16 },
  { time: '04:00', co2: 475, pm25: 9, voc: 15 },
  { time: '06:00', co2: 520, pm25: 11, voc: 18 },
  { time: '08:00', co2: 655, pm25: 17, voc: 27 },
  { time: '10:00', co2: 720, pm25: 20, voc: 31 },
  { time: '12:00+1', co2: 742, pm25: 18, voc: 32 },
]

// 라돈은 환기가 줄어드는 심야~새벽 시간대에 누적되는 경향을 반영했습니다 (CO2·PM2.5와는 다른 위상).
export const gasTrend: GasTrendPoint[] = [
  { time: '12:00', co: 12, radon: 60 },
  { time: '14:00', co: 13, radon: 55 },
  { time: '16:00', co: 16, radon: 50 },
  { time: '18:00', co: 17, radon: 55 },
  { time: '20:00', co: 15, radon: 65 },
  { time: '22:00', co: 13, radon: 80 },
  { time: '00:00', co: 11, radon: 100 },
  { time: '02:00', co: 9, radon: 125 },
  { time: '04:00', co: 8, radon: 145 },
  { time: '06:00', co: 9, radon: 130 },
  { time: '08:00', co: 14, radon: 90 },
  { time: '10:00', co: 16, radon: 70 },
  { time: '12:00+1', co: 17, radon: 60 },
]

export const CO_THRESHOLD = 25
// 라돈 권고기준: 148 Bq/㎥ (실내공기질 관리법 권고기준)
export const RADON_THRESHOLD = 148

export const ventilationSchedule: VentilationSchedulePoint[] = [
  { time: '-6h', observed: 520, predicted: null },
  { time: '-5h', observed: 560, predicted: null },
  { time: '-4h', observed: 605, predicted: null },
  { time: '-3h', observed: 648, predicted: null },
  { time: '-2h', observed: 690, predicted: null },
  { time: '-1h', observed: 715, predicted: null },
  { time: 'NOW', observed: 742, predicted: 742, isNow: true },
  { time: '+1h', observed: null, predicted: 780 },
  { time: '+2h', observed: null, predicted: 815, isVentilationStart: true },
  { time: '+3h', observed: null, predicted: 760 },
  { time: '+4h', observed: null, predicted: 690 },
  { time: '+5h', observed: null, predicted: 610 },
  { time: '+6h', observed: null, predicted: 545 },
]

export const CO2_THRESHOLD = 800

// voc는 원본 ppm(0.15~0.32) 값에 100을 곱한 지수로 저장되어 PM2.5와 같은 축을 공유합니다.
export const VOC_SCALE = 100
