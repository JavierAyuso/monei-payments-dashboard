import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Payments from './pages/Payments'
import PaymentDetail from './pages/PaymentDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/payments/:id" element={<PaymentDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
