import { useQuery } from '@apollo/client/react'
import { GET_CHARGE } from '@/graphql/charges'
import type { Charge } from '@/types/charge'

interface ChargeData {
  charge: Charge
}

interface ChargeVariables {
  id: string
}

export function useCharge(id: string) {
  const { data, loading, error } = useQuery<ChargeData, ChargeVariables>(GET_CHARGE, {
    variables: { id },
  })

  return {
    charge: data?.charge ?? null,
    loading,
    error,
  }
}
