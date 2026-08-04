import type { ReactNode } from 'react'
import Sidebar from './Sidebar'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-bg-white">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-y-auto bg-bg-white px-10 py-8">{children}</main>
    </div>
  )
}
