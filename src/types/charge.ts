export type ChargeStatus =
  | 'SUCCEEDED'
  | 'FAILED'
  | 'CANCELED'
  | 'EXPIRED'
  | 'REFUNDED'
  | 'PARTIALLY_REFUNDED'
  | 'AUTHORIZED'
  | 'PENDING'

export interface PaymentMethodCard {
  brand: string | null
  country: string | null
  last4: string | null
  cardholderName: string | null
  expiration: string | null
  bank: string | null
  threeDSecure: boolean | null
}

export interface PaymentMethodBizum {
  phoneNumber: string | null
}

export interface PaymentMethodPaypal {
  email: string | null
  name: string | null
}

export interface PaymentMethod {
  method: string | null
  card: PaymentMethodCard | null
  bizum: PaymentMethodBizum | null
  paypal: PaymentMethodPaypal | null
}

export interface Customer {
  email: string | null
  name: string | null
  phone: string | null
}

export interface TraceDetails {
  ip: string | null
  countryCode: string | null
  deviceType: string | null
  deviceModel: string | null
  browser: string | null
  browserVersion: string | null
  os: string | null
  osVersion: string | null
  userName: string | null
  userEmail: string | null
}

export interface Shop {
  name: string | null
  country: string | null
}

export interface Charge {
  id: string
  createdAt: number
  updatedAt: number
  amount: number
  currency: string
  status: ChargeStatus
  statusCode: string | null
  statusMessage: string | null
  orderId: string | null
  description: string | null
  authorizationCode: string | null
  livemode: boolean
  paymentMethod: PaymentMethod | null
  customer: Customer | null
  traceDetails: TraceDetails | null
  shop: Shop | null
}
