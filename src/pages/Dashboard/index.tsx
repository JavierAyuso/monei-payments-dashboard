import { useChargesKPI, DATE_RANGE_OPTIONS, type DateRangeOption } from '@/hooks/useChargesKPI'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { AlertCircle, TrendingUp, TrendingDown, Ban, RotateCcw } from 'lucide-react'

function KPICard({
  title,
  amount,
  count,
  currency,
  icon: Icon,
}: {
  title: string
  amount: number
  count: number
  currency: string
  icon: React.ElementType
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">
          {(amount / 100).toFixed(2)} {currency}
        </p>
        <p className="text-xs text-muted-foreground">{count} transacciones</p>
      </CardContent>
    </Card>
  )
}

function KPISkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="mb-2 h-8 w-32" />
            <Skeleton className="h-3 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { kpi, loading, error, selectedRange, setSelectedRange } = useChargesKPI()

  if (loading) {
    return (
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <KPISkeleton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!kpi) return null

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">{DATE_RANGE_OPTIONS[selectedRange].label}</p>
        </div>
        <div className="flex gap-2">
          {(Object.keys(DATE_RANGE_OPTIONS) as DateRangeOption[]).map((key) => (
            <Button
              key={key}
              variant={selectedRange === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRange(key)}
            >
              {DATE_RANGE_OPTIONS[key].label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Completados"
          amount={kpi.total.succeededAmount}
          count={kpi.total.succeededCount}
          currency={kpi.currency}
          icon={TrendingUp}
        />
        <KPICard
          title="Fallidos"
          amount={kpi.total.failedAmount}
          count={kpi.total.failedCount}
          currency={kpi.currency}
          icon={TrendingDown}
        />
        <KPICard
          title="Cancelados"
          amount={kpi.total.canceledAmount}
          count={kpi.total.canceledCount}
          currency={kpi.currency}
          icon={Ban}
        />
        <KPICard
          title="Reembolsados"
          amount={kpi.total.refundedAmount}
          count={kpi.total.refundedCount}
          currency={kpi.currency}
          icon={RotateCcw}
        />
      </div>
    </div>
  )
}
