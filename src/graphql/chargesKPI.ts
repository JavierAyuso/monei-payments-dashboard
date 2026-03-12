import { gql } from '@apollo/client'

export const GET_CHARGES_KPI = gql`
  query GetChargesKPI($start: Int, $end: Int, $timezone: String, $interval: Interval) {
    chargesDateRangeKPI(start: $start, end: $end, timezone: $timezone, interval: $interval) {
      currency
      total {
        succeededAmount
        succeededCount
        failedAmount
        failedCount
        canceledAmount
        canceledCount
        refundedAmount
        refundedCount
      }
      data {
        timestamp
        succeededAmount
        failedAmount
        canceledAmount
        refundedAmount
      }
    }
  }
`
