import type { ReactNode } from 'react'
import { X } from 'lucide-react'

interface SheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export default function Sheet({ open, onClose, title, children }: SheetProps) {
  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-300 ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-primary-navy/30" onClick={onClose} />
      <div
        className={`absolute right-0 top-0 h-full w-[440px] transform bg-bg-white shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border-gray px-6 py-5">
          <h2 className="text-card-title text-primary-navy">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-text-gray transition-colors hover:bg-bg-panel"
            aria-label="닫기"
          >
            <X size={22} />
          </button>
        </div>
        <div className="h-[calc(100%-73px)] overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </div>
  )
}
