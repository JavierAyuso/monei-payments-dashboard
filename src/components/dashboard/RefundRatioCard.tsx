import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RotateCcw } from 'lucide-react'
import { t } from '@/lib/i18n'

interface RefundRatioCardProps {
  refundedAmount: number
  succeededAmount: number
}

export function RefundRatioCard({ refundedAmount, succeededAmount }: RefundRatioCardProps) {
  const ratio = succeededAmount > 0 ? (refundedAmount / succeededAmount) * 100 : 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {t.dashboard.refundRatio}
        </CardTitle>
        <RotateCcw className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{ratio.toFixed(1)}%</p>
        <p className="text-xs text-muted-foreground">{t.dashboard.onCompletedVolume}</p>
      </CardContent>
    </Card>
  )
}
