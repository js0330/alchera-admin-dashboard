import { NavLink } from 'react-router-dom'
import { LayoutGrid, MapPinned, AlertTriangle, FileText } from 'lucide-react'

const MENU_ITEMS = [
  { to: '/', label: '통합 현황', icon: LayoutGrid },
  { to: '/zones', label: '구역별 모니터링', icon: MapPinned },
  { to: '/incidents', label: '이상 징후', icon: AlertTriangle },
  { to: '/reports', label: '운영 리포트', icon: FileText },
]

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-[240px] flex-shrink-0 flex-col bg-primary-navy">
      <div className="px-6 py-8">
        <img src="/alchera-logo.png" alt="ALCHERA" className="w-[120px]" />
        <p className="mt-1 text-caption text-white/50">밀폐공간 안전 예측 AI</p>
      </div>
      <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
        {MENU_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                isActive ? 'bg-primary-blue text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-6 py-6 text-caption text-white/40">v0.1.0 · Prototype</div>
    </aside>
  )
}
