import { useParams, useNavigate } from 'react-router-dom'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { useCharge } from '@/hooks/useCharge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { statusClass, statusLabel } from '@/lib/charge'
import { formatCurrency } from '@/lib/utils'
import { t } from '@/lib/i18n'

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
          <h2 className="font-medium">{t.paymentDetail.notAvailable}</h2>
          <p className="text-sm text-muted-foreground">{error.message}</p>
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mt-2">
            <ArrowLeft className="h-4 w-4" />
            {t.common.back}
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
          <h1 className="text-2xl font-bold">{t.paymentDetail.title}</h1>
        </div>
        <Badge className={`ml-auto ${statusClass[charge.status]}`}>
          {statusLabel[charge.status]}
        </Badge>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="flex flex-col gap-4 w-full">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t.paymentDetail.generalInfo}</CardTitle>
            </CardHeader>
            <CardContent>
              <DetailRow
                label={t.paymentDetail.amount}
                value={formatCurrency(charge.amount, charge.currency)}
              />
              <Separator />
              <DetailRow label={t.paymentDetail.orderId} value={charge.orderId} />
              <Separator />
              <DetailRow label={t.paymentDetail.description} value={charge.description} />
              <Separator />
              <DetailRow
                label={t.paymentDetail.createdAt}
                value={new Date(charge.createdAt * 1000).toLocaleString('es-ES')}
              />
              <Separator />
              <DetailRow
                label={t.paymentDetail.updatedAt}
                value={new Date(charge.updatedAt * 1000).toLocaleString('es-ES')}
              />
              <Separator />
              <DetailRow
                label={t.paymentDetail.authorizationCode}
                value={charge.authorizationCode}
              />
              <Separator />
              <DetailRow label={t.paymentDetail.statusCode} value={charge.statusCode} />
              <Separator />
              <DetailRow label={t.paymentDetail.statusMessage} value={charge.statusMessage} />
              <Separator />
              <DetailRow
                label={t.paymentDetail.environment}
                value={charge.livemode ? t.common.production : t.common.test}
              />
            </CardContent>
          </Card>

          {charge.customer && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t.paymentDetail.customer}</CardTitle>
              </CardHeader>
              <CardContent>
                <DetailRow label={t.paymentDetail.name} value={charge.customer.name} />
                <Separator />
                <DetailRow label={t.paymentDetail.email} value={charge.customer.email} />
                <Separator />
                <DetailRow label={t.paymentDetail.phone} value={charge.customer.phone} />
              </CardContent>
            </Card>
          )}

          {charge.shop && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t.paymentDetail.shop}</CardTitle>
              </CardHeader>
              <CardContent>
                <DetailRow label={t.paymentDetail.name} value={charge.shop.name} />
                <Separator />
                <DetailRow label={t.paymentDetail.country} value={charge.shop.country} />
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-4 w-full">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t.paymentDetail.paymentMethod}</CardTitle>
            </CardHeader>
            <CardContent>
              <DetailRow
                label={t.payments.method}
                value={<span className="capitalize">{charge.paymentMethod?.method ?? '—'}</span>}
              />
              {charge.paymentMethod?.card && (
                <>
                  <Separator />
                  <DetailRow
                    label={t.paymentDetail.brand}
                    value={charge.paymentMethod.card.brand}
                  />
                  <Separator />
                  <DetailRow
                    label={t.paymentDetail.last4}
                    value={charge.paymentMethod.card.last4}
                  />
                  <Separator />
                  <DetailRow
                    label={t.paymentDetail.cardholder}
                    value={charge.paymentMethod.card.cardholderName}
                  />
                  <Separator />
                  <DetailRow
                    label={t.paymentDetail.expiration}
                    value={charge.paymentMethod.card.expiration}
                  />
                  <Separator />
                  <DetailRow label={t.paymentDetail.bank} value={charge.paymentMethod.card.bank} />
                  <Separator />
                  <DetailRow
                    label={t.paymentDetail.country}
                    value={charge.paymentMethod.card.country}
                  />
                  <Separator />
                  <DetailRow
                    label={t.paymentDetail.threeDSecure}
                    value={charge.paymentMethod.card.threeDSecure ? t.common.yes : t.common.no}
                  />
                </>
              )}
              {charge.paymentMethod?.bizum && (
                <>
                  <Separator />
                  <DetailRow
                    label={t.paymentDetail.phone}
                    value={charge.paymentMethod.bizum.phoneNumber}
                  />
                </>
              )}
              {charge.paymentMethod?.paypal && (
                <>
                  <Separator />
                  <DetailRow
                    label={t.paymentDetail.email}
                    value={charge.paymentMethod.paypal.email}
                  />
                  <Separator />
                  <DetailRow
                    label={t.paymentDetail.name}
                    value={charge.paymentMethod.paypal.name}
                  />
                </>
              )}
            </CardContent>
          </Card>

          {charge.traceDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t.paymentDetail.traceDetails}</CardTitle>
              </CardHeader>
              <CardContent>
                <DetailRow label={t.paymentDetail.ip} value={charge.traceDetails.ip} />
                <Separator />
                <DetailRow
                  label={t.paymentDetail.country}
                  value={charge.traceDetails.countryCode}
                />
                <Separator />
                <DetailRow label={t.paymentDetail.device} value={charge.traceDetails.deviceType} />
                <Separator />
                <DetailRow label={t.paymentDetail.model} value={charge.traceDetails.deviceModel} />
                <Separator />
                <DetailRow
                  label={t.paymentDetail.browser}
                  value={`${charge.traceDetails.browser} ${charge.traceDetails.browserVersion}`}
                />
                <Separator />
                <DetailRow
                  label={t.paymentDetail.os}
                  value={`${charge.traceDetails.os} ${charge.traceDetails.osVersion}`}
                />
                <Separator />
                <DetailRow label={t.paymentDetail.user} value={charge.traceDetails.userName} />
                <Separator />
                <DetailRow
                  label={t.paymentDetail.userEmail}
                  value={charge.traceDetails.userEmail}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
