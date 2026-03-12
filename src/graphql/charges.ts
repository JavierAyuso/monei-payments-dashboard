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

export const GET_CHARGE = gql`
  query GetCharge($id: ID!) {
    charge(id: $id) {
      id
      accountId
      checkoutId
      providerReferenceId
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
      pageOpenedAt
      paymentMethod {
        method
        card {
          brand
          country
          type
          last4
          cardholderName
          expiration
          bank
          threeDSecure
        }
        bizum {
          phoneNumber
          integrationType
        }
        paypal {
          orderId
          payerId
          email
          name
        }
        sepa {
          accountholderName
          accountholderEmail
          last4
          bankName
          bic
        }
      }
      customer {
        email
        name
        phone
      }
      billingDetails {
        email
        name
        company
        phone
        taxId
      }
      shippingDetails {
        email
        name
        company
        phone
        taxId
      }
      shop {
        name
        country
      }
      traceDetails {
        ip
        userAgent
        countryCode
        deviceType
        deviceModel
        browser
        browserVersion
        os
        osVersion
        userId
        userEmail
        userName
      }
    }
  }
`
