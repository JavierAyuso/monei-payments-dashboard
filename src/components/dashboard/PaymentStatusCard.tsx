import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { PieChart as PieChartIcon } from 'lucide-react'
import { t } from '@/lib/i18n'

export interface StatusDataPoint {
  label: string
  value: number
  color: string
}

interface PaymentStatusCardProps {
  data: StatusDataPoint[]
}

export function PaymentStatusCard({ data }: PaymentStatusCardProps) {
  const totalCount = data.reduce((acc, d) => acc + d.value, 0)

  const chartData =
    totalCount === 0
      ? [{ name: t.common.noData, value: 1, color: '#e2e8f0' }]
      : data
          .filter((d) => d.value > 0)
          .map((d) => ({ name: d.label, value: d.value, color: d.color }))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {t.dashboard.paymentStatus}
        </CardTitle>
        <PieChartIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={160} minWidth={280}>
          <PieChart>
            <Pie
              cx="35%"
              cy="50%"
              data={chartData}
              dataKey="value"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={2}
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => {
                if (name === t.common.noData) return [t.dashboard.noPeriodData, '']
                const v = Number(value)
                const pct = ((v / totalCount) * 100).toFixed(1)
                return [`${v} (${pct}%)`, name as string]
              }}
            />
            <Legend
              align="right"
              iconSize={8}
              iconType="circle"
              layout="vertical"
              verticalAlign="middle"
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
