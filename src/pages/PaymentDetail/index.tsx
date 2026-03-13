import { useParams, useNavigate } from 'react-router-dom'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { useCharge } from '@/hooks/useCharge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { statusClass, statusLabel } from '@/lib/charge'
import { formatCurrency } from '@/lib/utils'

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null
  return (
    <div className="flex justify-between gap-4 py-2">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm font-medium text-right">{value}</span>
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-4">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-36" />
        </div>
        <Skeleton className="ml-auto h-5 w-20 rounded-full" />
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="flex flex-col gap-4 w-full">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex flex-col gap-4 w-full">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PaymentDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { charge, loading, error } = useCharge(id!)

  if (loading) return <DetailSkeleton />

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <AlertCircle className="h-8 w-8 text-yellow-500" />
          <h2 className="font-medium">No disponemos de detalle sobre esta operación</h2>
          <p className="text-sm text-muted-foreground">{error.message}</p>
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mt-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>
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
        </div>
        <Badge className={`ml-auto ${statusClass[charge.status]}`}>
          {statusLabel[charge.status]}
        </Badge>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="flex flex-col gap-4 w-full">
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

        <div className="flex flex-col gap-4 w-full">
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
        </div>
      </div>
    </div>
  )
}
