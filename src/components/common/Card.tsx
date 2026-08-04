import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export default function Card({ title, action, children, className }: CardProps) {
  return (
    <div className={`rounded-lg border border-border-gray bg-bg-white p-6 shadow-card ${className ?? ''}`}>
      {(title || action) && (
        <div className="mb-5 flex items-center justify-between">
          {title && <h2 className="text-card-title text-primary-navy">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </div>
  )
}
