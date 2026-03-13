export interface KPIDataPoint {
  timestamp: number
  succeededAmount: number
  failedAmount: number
  canceledAmount: number
  refundedAmount: number
}

export interface KPITotal {
  succeededAmount: number
  succeededCount: number
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
