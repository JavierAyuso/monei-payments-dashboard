import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RotateCcw } from 'lucide-react'

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
          Ratio de reembolsos
        </CardTitle>
        <RotateCcw className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{ratio.toFixed(1)}%</p>
        <p className="text-xs text-muted-foreground">sobre el volumen completado</p>
      </CardContent>
    </Card>
  )
}
