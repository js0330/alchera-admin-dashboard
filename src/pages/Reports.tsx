import { useState } from 'react'
import Card from '../components/common/Card'
import KpiCard from '../components/common/KpiCard'
import FalseAlarmTrendChart from '../components/charts/FalseAlarmTrendChart'
import { monthlyTrend, reportMetrics, weeklyTrend } from '../data/reports'

type Period = 'weekly' | 'monthly'

export default function Reports() {
  const [period, setPeriod] = useState<Period>('weekly')
  const trendData = period === 'weekly' ? weeklyTrend : monthlyTrend

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-page-title text-primary-navy">운영 리포트</h1>
          <p className="mt-2 text-base text-text-gray">밀폐공간 안전 예측 AI 도입 성과를 확인하세요.</p>
        </div>
        <div className="flex gap-2 rounded-lg border border-border-gray bg-bg-panel p-1">
          <button
            onClick={() => setPeriod('weekly')}
            className={`rounded-md px-5 py-2 text-base font-medium transition-colors ${
              period === 'weekly' ? 'bg-primary-blue text-white' : 'text-text-gray hover:text-primary-navy'
            }`}
          >
            주간
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`rounded-md px-5 py-2 text-base font-medium transition-colors ${
              period === 'monthly' ? 'bg-primary-blue text-white' : 'text-text-gray hover:text-primary-navy'
            }`}
          >
            월간
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-5">
        {reportMetrics.map((metric) => (
          <KpiCard key={metric.id} label={metric.label} value={metric.value} sublabel={metric.sublabel} />
        ))}
      </div>

      <Card title={`${period === 'weekly' ? '주간' : '월간'} 오탐 감소율 추세`} className="mt-6">
        <FalseAlarmTrendChart data={trendData} />
      </Card>
    </div>
  )
}
