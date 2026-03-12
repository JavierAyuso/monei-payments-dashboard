import { gql } from '@apollo/client'

export const GET_CHARGES_KPI = gql`
  query GetChargesKPI($start: Int, $end: Int, $timezone: String) {
    chargesDateRangeKPI(start: $start, end: $end, timezone: $timezone) {
      currency
      total {
        succeededAmount
        succeededCount
        capturedAmount
        capturedCount
        canceledAmount
        canceledCount
        refundedAmount
        refundedCount
        failedAmount
        failedCount
      }
      data {
        timestamp
        succeededAmount
        succeededCount
        capturedAmount
        capturedCount
        canceledAmount
        canceledCount
        refundedAmount
        refundedCount
        failedAmount
        failedCount
        cuSucceededAmount
        cuSucceededCount
      }
    }
  }
`
