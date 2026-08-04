import type { ZoneStatus } from '../../types'

const STATUS_CONFIG: Record<ZoneStatus, { label: string; bg: string; text: string; dot: string }> = {
  normal: { label: '정상', bg: 'bg-status-normal/10', text: 'text-status-normal', dot: 'bg-status-normal' },
  caution: { label: '주의', bg: 'bg-status-caution/10', text: 'text-status-caution', dot: 'bg-status-caution' },
  danger: { label: '위험', bg: 'bg-status-danger/10', text: 'text-status-danger', dot: 'bg-status-danger' },
}

interface StatusBadgeProps {
  status: ZoneStatus
  size?: 'sm' | 'md' | 'lg'
  /** 사진/영상 위에 올려질 때 배경과 색이 섞이지 않도록 불투명한 배경을 사용합니다. */
  solid?: boolean
}

export default function StatusBadge({ status, size = 'md', solid = false }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]
  const sizeClasses =
    size === 'lg'
      ? 'text-base px-4 py-2 gap-2'
      : size === 'sm'
        ? 'text-caption px-2.5 py-1 gap-1.5'
        : 'text-base px-3 py-1.5 gap-1.5'

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold shadow-sm ${
        solid ? 'bg-bg-white' : config.bg
      } ${config.text} ${sizeClasses}`}
    >
      <span className={`inline-block rounded-full ${config.dot} ${size === 'lg' ? 'h-2.5 w-2.5' : 'h-2 w-2'}`} />
      {config.label}
    </span>
  )
}
