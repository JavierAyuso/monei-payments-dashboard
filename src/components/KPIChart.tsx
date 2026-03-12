import { format, fromUnixTime } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { KPIDataPoint } from '@/types/kpis'
import type { DateRangeOption } from '@/hooks/useChargesKPI'

interface KPIChartProps {
  data: KPIDataPoint[]
  currency: string
  range: DateRangeOption
}

export function KPIChart({ data, currency, range }: KPIChartProps) {
  const dateFormat = range === 'all' || range === 'year' ? 'MMM yyyy' : 'dd MMM'

  const chartData = data
    .filter(
      (d) =>
        d.succeededAmount > 0 || d.failedAmount > 0 || d.canceledAmount > 0 || d.refundedAmount > 0
    )
    .map((d) => ({
      date: format(fromUnixTime(d.timestamp), dateFormat, { locale: es }),
      Completados: d.succeededAmount / 100,
      Fallidos: d.failedAmount / 100,
      Cancelados: d.canceledAmount / 100,
      Reembolsados: d.refundedAmount / 100,
    }))

  if (chartData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        No hay datos para mostrar en este período
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-muted-foreground" />
        <YAxis
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
          tickFormatter={(v) => `${v} ${currency}`}
        />
        <Tooltip formatter={(value) => [`${Number(value).toFixed(2)} ${currency}`]} />
        <Legend />
        <Line type="monotone" dataKey="Completados" stroke="#22c55e" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="Fallidos" stroke="#ef4444" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="Cancelados" stroke="#94a3b8" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="Reembolsados" stroke="#f59e0b" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
