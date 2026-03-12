import { useParams, useNavigate } from 'react-router-dom'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { useCharge } from '@/hooks/useCharge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import type { ChargeStatus } from '@/types/charge'
import { formatCurrency } from '@/lib/utils'

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

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null
  return (
    <div className="flex justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}

export default function PaymentDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { charge, loading, error } = useCharge(id!)

  if (loading) {
    return (
      <div className="p-8">
        <Skeleton className="mb-6 h-8 w-48" />
        <div className="grid gap-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Detalle del pago</h1>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!charge) return null

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/payments')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Detalle del pago</h1>
          <p className="font-mono text-xs text-muted-foreground">{charge.id}</p>
        </div>
        <Badge className="ml-auto" variant={statusVariant[charge.status]}>
          {statusLabel[charge.status]}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Información general */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Información general</CardTitle>
          </CardHeader>
          <CardContent>
            <DetailRow label="Importe" value={formatCurrency(charge.amount, charge.currency)} />
            <Separator />
            <DetailRow label="Order ID" value={charge.orderId} />
            <Separator />
            <DetailRow label="Descripción" value={charge.description} />
            <Separator />
            <DetailRow
              label="Fecha de creación"
              value={new Date(charge.createdAt * 1000).toLocaleString('es-ES')}
            />
            <Separator />
            <DetailRow
              label="Última actualización"
              value={new Date(charge.updatedAt * 1000).toLocaleString('es-ES')}
            />
            <Separator />
            <DetailRow label="Código de autorización" value={charge.authorizationCode} />
            <Separator />
            <DetailRow label="Código de estado" value={charge.statusCode} />
            <Separator />
            <DetailRow label="Mensaje de estado" value={charge.statusMessage} />
            <Separator />
            <DetailRow label="Entorno" value={charge.livemode ? 'Producción' : 'Test'} />
          </CardContent>
        </Card>

        {/* Método de pago */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Método de pago</CardTitle>
          </CardHeader>
          <CardContent>
            <DetailRow
              label="Método"
              value={<span className="capitalize">{charge.paymentMethod?.method ?? '—'}</span>}
            />
            {charge.paymentMethod?.card && (
              <>
                <Separator />
                <DetailRow label="Marca" value={charge.paymentMethod.card.brand} />
                <Separator />
                <DetailRow label="Últimos 4 dígitos" value={charge.paymentMethod.card.last4} />
                <Separator />
                <DetailRow label="Titular" value={charge.paymentMethod.card.cardholderName} />
                <Separator />
                <DetailRow label="Expiración" value={charge.paymentMethod.card.expiration} />
                <Separator />
                <DetailRow label="Banco" value={charge.paymentMethod.card.bank} />
                <Separator />
                <DetailRow label="País" value={charge.paymentMethod.card.country} />
                <Separator />
                <DetailRow
                  label="3D Secure"
                  value={charge.paymentMethod.card.threeDSecure ? 'Sí' : 'No'}
                />
              </>
            )}
            {charge.paymentMethod?.bizum && (
              <>
                <Separator />
                <DetailRow label="Teléfono" value={charge.paymentMethod.bizum.phoneNumber} />
              </>
            )}
            {charge.paymentMethod?.paypal && (
              <>
                <Separator />
                <DetailRow label="Email" value={charge.paymentMethod.paypal.email} />
                <Separator />
                <DetailRow label="Nombre" value={charge.paymentMethod.paypal.name} />
              </>
            )}
          </CardContent>
        </Card>

        {/* Cliente */}
        {charge.customer && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <DetailRow label="Nombre" value={charge.customer.name} />
              <Separator />
              <DetailRow label="Email" value={charge.customer.email} />
              <Separator />
              <DetailRow label="Teléfono" value={charge.customer.phone} />
            </CardContent>
          </Card>
        )}

        {/* Traza técnica */}
        {charge.traceDetails && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Traza técnica</CardTitle>
            </CardHeader>
            <CardContent>
              <DetailRow label="IP" value={charge.traceDetails.ip} />
              <Separator />
              <DetailRow label="País" value={charge.traceDetails.countryCode} />
              <Separator />
              <DetailRow label="Dispositivo" value={charge.traceDetails.deviceType} />
              <Separator />
              <DetailRow label="Modelo" value={charge.traceDetails.deviceModel} />
              <Separator />
              <DetailRow
                label="Navegador"
                value={`${charge.traceDetails.browser} ${charge.traceDetails.browserVersion}`}
              />
              <Separator />
              <DetailRow
                label="Sistema operativo"
                value={`${charge.traceDetails.os} ${charge.traceDetails.osVersion}`}
              />
              <Separator />
              <DetailRow label="Usuario" value={charge.traceDetails.userName} />
              <Separator />
              <DetailRow label="Email usuario" value={charge.traceDetails.userEmail} />
            </CardContent>
          </Card>
        )}

        {/* Tienda */}
        {charge.shop && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tienda</CardTitle>
            </CardHeader>
            <CardContent>
              <DetailRow label="Nombre" value={charge.shop.name} />
              <Separator />
              <DetailRow label="País" value={charge.shop.country} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
