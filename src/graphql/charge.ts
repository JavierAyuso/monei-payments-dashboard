import { gql } from '@apollo/client'

export const GET_CHARGE = gql`
  query GetCharge($id: ID!) {
    charge(id: $id) {
      id
      createdAt
      updatedAt
      amount
      currency
      status
      statusCode
      statusMessage
      orderId
      description
      authorizationCode
      livemode
      paymentMethod {
        method
        card {
          brand
          country
          last4
          cardholderName
          expiration
          bank
          threeDSecure
        }
        bizum {
          phoneNumber
        }
        paypal {
          email
          name
        }
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
      traceDetails {
        ip
        countryCode
        deviceType
        deviceModel
        browser
        browserVersion
        os
        osVersion
        userName
        userEmail
      }
    }
  }
`
