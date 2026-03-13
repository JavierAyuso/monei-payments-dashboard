import { gql } from '@apollo/client'

export const GET_CHARGES = gql`
  query GetCharges($size: Int, $from: Int, $filter: SearchableChargeFilterInput) {
    charges(size: $size, from: $from, filter: $filter) {
      items {
        id
        createdAt
        amount
        currency
        status
        orderId
        paymentMethod {
          method
        }
      }
      total
    }
  }
`
