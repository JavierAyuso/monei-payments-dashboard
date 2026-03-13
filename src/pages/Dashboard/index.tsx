import { useChargesKPI, DATE_RANGE_OPTIONS, type DateRangeOption } from '@/hooks/useChargesKPI'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { VolumeCard } from '@/components/dashboard/VolumeCard'
import { AverageTicketCard } from '@/components/dashboard/AverageTicketCard'
import { PaymentStatusCard } from '@/components/dashboard/PaymentStatusCard'
import { RefundRatioCard } from '@/components/dashboard/RefundRatioCard'
import { SuccessRateChart } from '@/components/dashboard/SuccessRateChart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AlertCircle, TrendingUp, Activity } from 'lucide-react'

function KPISkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="mb-2 h-8 w-32" />
            <Skeleton className="h-3 w-40" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { kpi, loading, error, selectedRange, setSelectedRange } = useChargesKPI()

  const totalVolume = kpi
    ? kpi.total.succeededAmount +
      kpi.total.refundedAmount +
      kpi.total.canceledAmount +
      kpi.total.failedAmount
    : 0

  const totalCount = kpi
    ? kpi.total.succeededCount +
      kpi.total.refundedCount +
      kpi.total.canceledCount +
      kpi.total.failedCount
    : 0

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
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Select value={selectedRange} onValueChange={(v) => setSelectedRange(v as DateRangeOption)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(DATE_RANGE_OPTIONS) as DateRangeOption[]).map((key) => (
              <SelectItem key={key} value={key}>
                {DATE_RANGE_OPTIONS[key].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <VolumeCard
          title="Volumen completado"
          amount={kpi.total.succeededAmount}
          count={kpi.total.succeededCount}
          currency={kpi.currency}
          icon={TrendingUp}
          description="solo pagos completados"
        />
        <VolumeCard
          title="Volumen total"
          amount={totalVolume}
          count={totalCount}
          currency={kpi.currency}
          icon={Activity}
          description="completados + fallidos + cancelados + reembolsados"
        />
        <PaymentStatusCard total={kpi.total} />
        <AverageTicketCard
          succeededAmount={kpi.total.succeededAmount}
          succeededCount={kpi.total.succeededCount}
          currency={kpi.currency}
        />
        <RefundRatioCard
          refundedAmount={kpi.total.refundedAmount}
          succeededAmount={kpi.total.succeededAmount}
        />
        <SuccessRateChart data={kpi.data} range={selectedRange} />
      </div>
    </div>
  )
}
