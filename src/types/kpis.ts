export interface KPIDataPoint {
  timestamp: number
  succeededAmount: number
  succeededCount: number
  capturedAmount: number
  capturedCount: number
  canceledAmount: number
  canceledCount: number
  refundedAmount: number
  refundedCount: number
  failedAmount: number
  failedCount: number
  cuSucceededAmount: number
  cuSucceededCount: number
}

export interface KPITotal {
  succeededAmount: number
  succeededCount: number
  capturedAmount: number
  capturedCount: number
  canceledAmount: number
  canceledCount: number
  refundedAmount: number
  refundedCount: number
  failedAmount: number
  failedCount: number
}
export interface ChargesKPI {
  currency: string
  total: KPITotal
  data: KPIDataPoint[]
}

export interface KPIVariables {
  start: number
  end: number
  timezone: string
  interval: string
}
export interface KPIData {
  chargesDateRangeKPI: ChargesKPI
}
