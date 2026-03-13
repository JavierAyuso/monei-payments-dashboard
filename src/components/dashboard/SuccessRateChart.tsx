import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format, fromUnixTime } from 'date-fns'
import { es } from 'date-fns/locale'
import type { KPIDataPoint } from '@/types/kpis'
import type { DateRangeOption } from '@/hooks/useChargesKPI'
import { BarChart2 } from 'lucide-react'
import { t } from '@/lib/i18n'

interface SuccessRateChartProps {
  data: KPIDataPoint[]
  range: DateRangeOption
}

export function SuccessRateChart({ data, range }: SuccessRateChartProps) {
  const dateFormat = range === 'all' || range === 'year' ? 'MMM yyyy' : 'dd MMM'

  const chartData = data
    .map((d) => {
      const total = d.succeededAmount + d.failedAmount + d.canceledAmount + d.refundedAmount
      const rate = total > 0 ? (d.succeededAmount / total) * 100 : 0
      return {
        date: format(fromUnixTime(d.timestamp), dateFormat, { locale: es }),
        rate: parseFloat(rate.toFixed(1)),
        total,
      }
    })
    .filter((d) => d.total > 0)

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {t.dashboard.successRateShort}
          </CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
            {t.dashboard.noChartData}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {t.dashboard.successRate}
        </CardTitle>
        <BarChart2 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-muted-foreground" />
            <YAxis
              tick={{ fontSize: 12 }}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              className="text-muted-foreground"
            />
            <Tooltip formatter={(value) => [`${value}%`, t.dashboard.successRateShort]} />
            <Bar dataKey="rate" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
