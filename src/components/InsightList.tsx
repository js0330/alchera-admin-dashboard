import type { LucideIcon } from 'lucide-react'

export interface InsightItem {
  icon: LucideIcon
  iconClassName: string
  title: string
  description: string
}

interface InsightListProps {
  items: InsightItem[]
}

export default function InsightList({ items }: InsightListProps) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <div key={index} className="flex items-start gap-3">
            <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${item.iconClassName}`}>
              <Icon size={18} />
            </div>
            <div>
              <p className="text-base font-semibold text-primary-navy">{item.title}</p>
              <p className="mt-0.5 text-base text-text-gray">{item.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
