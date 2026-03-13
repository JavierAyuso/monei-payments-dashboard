import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { KPITotal } from '@/types/kpis'
import { PieChart as PieChartIcon } from 'lucide-react'

interface PaymentStatusCardProps {
  total: KPITotal
}

const STATUSES = [
  { key: 'succeededCount', label: 'Completados', color: '#22c55e' },
  { key: 'failedCount', label: 'Fallidos', color: '#ef4444' },
  { key: 'canceledCount', label: 'Cancelados', color: '#94a3b8' },
  { key: 'refundedCount', label: 'Reembolsados', color: '#f59e0b' },
]

export function PaymentStatusCard({ total }: PaymentStatusCardProps) {
  const totalCount = STATUSES.reduce((acc, s) => acc + total[s.key as keyof KPITotal], 0)

  const data =
    totalCount === 0
      ? [{ name: 'Sin pagos', value: 1, color: '#e2e8f0' }]
      : STATUSES.map((s) => ({
          name: s.label,
          value: total[s.key as keyof KPITotal],
          color: s.color,
        })).filter((d) => d.value > 0)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Estado de pagos</CardTitle>
        <PieChartIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={160} minWidth={280}>
          <PieChart>
            <Pie
              data={data}
              cx="35%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => {
                if (name === 'Sin pagos') return ['Sin pagos en este período', '']
                const v = Number(value)
                const pct = ((v / totalCount) * 100).toFixed(1)
                return [`${v} (${pct}%)`, name as string]
              }}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
