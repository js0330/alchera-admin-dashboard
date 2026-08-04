import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Overview from './pages/Overview'
import ZoneMonitoring from './pages/ZoneMonitoring'
import Incidents from './pages/Incidents'
import Reports from './pages/Reports'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/zones" element={<ZoneMonitoring />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
