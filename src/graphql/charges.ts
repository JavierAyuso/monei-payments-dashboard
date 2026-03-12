import { gql } from '@apollo/client'

export const GET_CHARGES = gql`
  query GetCharges($size: Int, $from: Int, $filter: SearchableChargeFilterInput) {
    charges(size: $size, from: $from, filter: $filter) {
      items {
        id
        accountId
        checkoutId
        createdAt
        updatedAt
        amount
        amountEUR
        currency
        status
        statusCode
        statusMessage
        orderId
        description
        authorizationCode
        billingPlan
        livemode
        cancellationReason
        lastRefundAmount
        lastRefundReason
        refundedAmount
        paymentMethod {
          method
        }
        customer {
          email
          name
          phone
        }
        shop {
          name
          country
        }
      }
      total
    }
  }
`
