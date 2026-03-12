import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import Dashboard from './pages/Dashboard'
import Payments from './pages/Payments'
import PaymentDetail from './pages/PaymentDetail'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto md:pt-0 pt-14">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/payments/:id" element={<PaymentDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
