import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCharges } from '@/hooks/useCharges'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DateRangePicker } from '@/components/DateRangePicker'
import type { ChargeStatus } from '@/types/charge'
import { formatCurrency } from '@/lib/utils'
import { PAGE_SIZE } from '@/lib/constants'

const statusVariant: Record<ChargeStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  SUCCEEDED: 'default',
  FAILED: 'destructive',
  CANCELED: 'secondary',
  EXPIRED: 'outline',
  REFUNDED: 'secondary',
  PARTIALLY_REFUNDED: 'secondary',
  AUTHORIZED: 'default',
  PENDING: 'outline',
}

const statusLabel: Record<ChargeStatus, string> = {
  SUCCEEDED: 'Completado',
  FAILED: 'Fallido',
  CANCELED: 'Cancelado',
  EXPIRED: 'Expirado',
  REFUNDED: 'Reembolsado',
  PARTIALLY_REFUNDED: 'Reembolso parcial',
  AUTHORIZED: 'Autorizado',
  PENDING: 'Pendiente',
}

export default function Payments() {
  const [searchParams, setSearchParams] = useSearchParams()
  const rawPage = Number(searchParams.get('page'))
  const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage

  const {
    charges,
    total,
    loading,
    error,
    totalPages,
    hasNextPage,
    hasPrevPage,
    goToNextPage,
    goToPrevPage,
    statusFilter,
    setStatusFilter,
    dateRange,
    setDateRange,
  } = useCharges(page)

  const navigate = useNavigate()

  useEffect(() => {
    if (isNaN(rawPage) || rawPage < 1) {
      setSearchParams({ page: '1' }, { replace: true })
    } else if (totalPages > 0 && rawPage > totalPages) {
      setSearchParams({ page: String(totalPages) }, { replace: true })
    }
  }, [totalPages])

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pagos</h1>
        <p className="text-muted-foreground">{total} pagos en total</p>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <Select
          value={statusFilter ?? 'ALL'}
          onValueChange={(value) =>
            setStatusFilter(value === 'ALL' ? null : (value as ChargeStatus))
          }
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos los estados</SelectItem>
            <SelectItem value="SUCCEEDED">Completado</SelectItem>
            <SelectItem value="FAILED">Fallido</SelectItem>
            <SelectItem value="CANCELED">Cancelado</SelectItem>
            <SelectItem value="EXPIRED">Expirado</SelectItem>
            <SelectItem value="REFUNDED">Reembolsado</SelectItem>
            <SelectItem value="PARTIALLY_REFUNDED">Reembolso parcial</SelectItem>
          </SelectContent>
        </Select>
        <DateRangePicker from={dateRange.from} to={dateRange.to} onChange={setDateRange} />
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Importe</TableHead>
            <TableHead>Método</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
              </TableRow>
            ))
          ) : charges.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                No se encontraron pagos
              </TableCell>
            </TableRow>
          ) : (
            charges.map((charge) => (
              <TableRow
                key={charge.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/payments/${charge.id}`)}
              >
                <TableCell>
                  {new Date(charge.createdAt * 1000).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                <TableCell className="font-mono text-xs">{charge.orderId ?? '—'}</TableCell>
                <TableCell>{formatCurrency(charge.amount, charge.currency)}</TableCell>
                <TableCell className="capitalize">{charge.paymentMethod?.method ?? '—'}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[charge.status]}>{statusLabel[charge.status]}</Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Página {page} de {totalPages}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={goToPrevPage} disabled={!hasPrevPage}>
            Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={goToNextPage} disabled={!hasNextPage}>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
