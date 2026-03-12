export type ChargeStatus =
  | 'SUCCEEDED'
  | 'FAILED'
  | 'CANCELED'
  | 'EXPIRED'
  | 'REFUNDED'
  | 'AUTHORIZED'
  | 'PENDING'

export interface PaymentMethodCard {
  brand: string | null
  country: string | null
  type: string | null
  last4: string | null
  cardholderName: string | null
  expiration: string | null
  bank: string | null
  threeDSecure: boolean | null
}

export interface PaymentMethodBizum {
  phoneNumber: string | null
  integrationType: string | null
}

export interface PaymentMethodPaypal {
  orderId: string | null
  payerId: string | null
  email: string | null
  name: string | null
}

export interface PaymentMethodSepa {
  accountholderName: string | null
  accountholderEmail: string | null
  last4: string | null
  bankName: string | null
  bic: string | null
}

export interface PaymentMethod {
  method: string | null
  card: PaymentMethodCard | null
  bizum: PaymentMethodBizum | null
  paypal: PaymentMethodPaypal | null
  sepa: PaymentMethodSepa | null
}

export interface Customer {
  email: string | null
  name: string | null
  phone: string | null
}

export interface ShippingDetails {
  email: string | null
  name: string | null
  company: string | null
  phone: string | null
  taxId: string | null
}

export interface BillingDetails {
  email: string | null
  name: string | null
  company: string | null
  phone: string | null
  taxId: string | null
}

export interface TraceDetails {
  ip: string | null
  userAgent: string | null
  countryCode: string | null
  deviceType: string | null
  deviceModel: string | null
  browser: string | null
  browserVersion: string | null
  os: string | null
  osVersion: string | null
  userId: string | null
  userEmail: string | null
  userName: string | null
}

export interface Shop {
  name: string | null
  country: string | null
}

export interface Charge {
  id: string
  accountId: string
  checkoutId: string
  createdAt: number
  updatedAt: number
  amount: number
  amountEUR: number | null
  currency: string
  status: ChargeStatus
  statusCode: string | null
  statusMessage: string | null
  orderId: string | null
  description: string | null
  authorizationCode: string | null
  billingPlan: string | null
  livemode: boolean
  cancellationReason: string | null
  lastRefundAmount: number | null
  lastRefundReason: string | null
  refundedAmount: number | null
  paymentMethod: PaymentMethod | null
  customer: Customer | null
  billingDetails: BillingDetails | null
  shippingDetails: ShippingDetails | null
  traceDetails: TraceDetails | null
  shop: Shop | null
}
