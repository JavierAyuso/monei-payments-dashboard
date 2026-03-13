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
import { statusColor, statusLabel } from '@/lib/charge'
import { AlertCircle, TrendingUp, Activity } from 'lucide-react'
import { t } from '@/lib/i18n'

function KPISkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start">
      <div className="flex flex-col gap-4 w-full">
        {Array.from({ length: 3 }).map((_, i) => (
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
      <div className="flex flex-col gap-4 w-full">
        {Array.from({ length: 3 }).map((_, i) => (
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
          <h1 className="text-2xl font-bold">{t.dashboard.title}</h1>
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
          <AlertTitle>{t.common.error}</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!kpi) return null

  const statusData = [
    {
      label: statusLabel['SUCCEEDED'],
      value: kpi.total.succeededCount,
      color: statusColor['SUCCEEDED'],
    },
    { label: statusLabel['FAILED'], value: kpi.total.failedCount, color: statusColor['FAILED'] },
    {
      label: statusLabel['CANCELED'],
      value: kpi.total.canceledCount,
      color: statusColor['CANCELED'],
    },
    {
      label: statusLabel['REFUNDED'],
      value: kpi.total.refundedCount,
      color: statusColor['REFUNDED'],
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t.dashboard.title}</h1>
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

      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="flex flex-col gap-4 w-full">
          <VolumeCard
            title={t.dashboard.completedVolume}
            amount={kpi.total.succeededAmount}
            count={kpi.total.succeededCount}
            currency={kpi.currency}
            icon={TrendingUp}
          />
          <PaymentStatusCard data={statusData} />
          <RefundRatioCard
            refundedAmount={kpi.total.refundedAmount}
            succeededAmount={kpi.total.succeededAmount}
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <VolumeCard
            title={t.dashboard.totalVolume}
            amount={totalVolume}
            count={totalCount}
            currency={kpi.currency}
            icon={Activity}
          />
          <AverageTicketCard
            succeededAmount={kpi.total.succeededAmount}
            succeededCount={kpi.total.succeededCount}
            currency={kpi.currency}
          />
          <SuccessRateChart data={kpi.data} range={selectedRange} />
        </div>
      </div>
    </div>
  )
}
