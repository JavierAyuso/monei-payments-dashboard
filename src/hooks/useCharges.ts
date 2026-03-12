import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { GET_CHARGES } from '@/graphql/charges'
import type { Charge, ChargeStatus } from '@/types/charge'

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
  const [statusFilter, setStatusFilter] = useState<ChargeStatus | null>(null)

  const { data, loading, error } = useQuery<ChargesData, ChargesVariables>(GET_CHARGES, {
    variables: {
      size: PAGE_SIZE,
      from: page * PAGE_SIZE,
      filter: statusFilter ? { status: { eq: statusFilter } } : undefined,
    },
  })

  const total = data?.charges.total ?? 0
  const totalPages = Math.ceil(total / PAGE_SIZE)

  const handleStatusFilter = (status: ChargeStatus | null) => {
    setStatusFilter(status)
    setPage(0) // volver a la primera página al filtrar
  }

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
    statusFilter,
    setStatusFilter: handleStatusFilter,
  }
}
