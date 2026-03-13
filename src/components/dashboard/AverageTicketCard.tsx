import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { Ticket } from 'lucide-react'
import { t } from '@/lib/i18n'

interface AverageTicketCardProps {
  succeededAmount: number
  succeededCount: number
  currency: string
}

export function AverageTicketCard({
  succeededAmount,
  succeededCount,
  currency,
}: AverageTicketCardProps) {
  const average = succeededCount > 0 ? succeededAmount / succeededCount : 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {t.dashboard.averageTicket}
        </CardTitle>
        <Ticket className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{formatCurrency(average, currency)}</p>
        <p className="text-xs text-muted-foreground">{t.dashboard.perCompletedPayment}</p>
      </CardContent>
    </Card>
  )
}
