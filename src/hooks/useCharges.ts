import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { GET_CHARGES } from '@/graphql/charges'
import type { Charge } from '@/types/charge'

const PAGE_SIZE = 20

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

export function useCharges() {
  const [page, setPage] = useState(0)

  const { data, loading, error } = useQuery<ChargesData, ChargesVariables>(GET_CHARGES, {
    variables: {
      size: PAGE_SIZE,
      from: page * PAGE_SIZE,
    },
  })

  const total = data?.charges.total ?? 0
  const totalPages = Math.ceil(total / PAGE_SIZE)

  return {
    charges: data?.charges.items ?? [],
    total,
    loading,
    error,
    page,
    totalPages,
    hasNextPage: page < totalPages - 1,
    hasPrevPage: page > 0,
    goToNextPage: () => setPage((p) => p + 1),
    goToPrevPage: () => setPage((p) => p - 1),
  }
}
