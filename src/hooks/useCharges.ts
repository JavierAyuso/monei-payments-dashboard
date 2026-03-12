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
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  })

  const buildFilter = () => {
    const filter: ChargesVariables['filter'] = {}

    if (statusFilter) {
      filter.status = { eq: statusFilter }
    }

    if (dateRange.from && dateRange.to) {
      filter.createdAt = {
        gte: Math.floor(dateRange.from.getTime() / 1000),
        lte: Math.floor(dateRange.to.getTime() / 1000),
      }
    }

    return Object.keys(filter).length > 0 ? filter : undefined
  }

  const { data, loading, error } = useQuery<ChargesData, ChargesVariables>(GET_CHARGES, {
    variables: {
      size: PAGE_SIZE,
      from: page * PAGE_SIZE,
      filter: buildFilter(),
    },
  })

  const total = data?.charges.total ?? 0
  const totalPages = Math.ceil(total / PAGE_SIZE)

  const handleStatusFilter = (status: ChargeStatus | null) => {
    setStatusFilter(status)
    setPage(0)
  }

  const handleDateRange = (range: { from: Date | null; to: Date | null }) => {
    setDateRange(range)
    setPage(0)
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
    dateRange,
    setDateRange: handleDateRange,
  }
}
