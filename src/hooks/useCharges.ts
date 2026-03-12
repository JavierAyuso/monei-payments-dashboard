import { useQuery } from '@apollo/client/react'
import { GET_CHARGES } from '@/graphql/charges'
import type { Charge } from '@/types/charge'

interface ChargesData {
  charges: {
    items: Charge[]
    total: number
  }
}

interface ChargesVariables {
  size?: number
  from?: number
  filter?: {
    status?: { eq: string }
    createdAt?: { gte: number; lte: number }
  }
}

export function useCharges(variables?: ChargesVariables) {
  const { data, loading, error } = useQuery<ChargesData, ChargesVariables>(GET_CHARGES, {
    variables: {
      size: 20,
      from: 0,
      ...variables,
    },
  })

  return {
    charges: data?.charges.items ?? [],
    total: data?.charges.total ?? 0,
    loading,
    error,
  }
}
