import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { t } from '@/lib/i18n'

interface VolumeCardProps {
  title: string
  amount: number
  count: number
  currency: string
  icon: React.ElementType
}

export function VolumeCard({ title, amount, count, currency, icon: Icon }: VolumeCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{formatCurrency(amount, currency)}</p>
        <p className="text-xs text-muted-foreground">{t.dashboard.transactions(count)}</p>
      </CardContent>
    </Card>
  )
}
