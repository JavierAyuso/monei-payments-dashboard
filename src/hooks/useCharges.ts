import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { GET_CHARGES } from '@/graphql/charges'
import type { Charge, ChargeStatus } from '@/types/charge'
import { PAGE_SIZE } from '@/lib/constants'

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

export function useCharges(page: number) {
  const [, setSearchParams] = useSearchParams()

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
      from: (page - 1) * PAGE_SIZE,
      filter: buildFilter(),
    },
  })

  const total = data?.charges.total ?? 0
  const totalPages = Math.ceil(total / PAGE_SIZE)

  const handleStatusFilter = (status: ChargeStatus | null) => {
    setStatusFilter(status)
    setSearchParams({ page: '1' })
  }

  const handleDateRange = (range: { from: Date | null; to: Date | null }) => {
    setDateRange(range)
    setSearchParams({ page: '1' })
  }

  return {
    charges: data?.charges.items ?? [],
    total,
    loading,
    error,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    goToNextPage: () => setSearchParams({ page: String(page + 1) }),
    goToPrevPage: () => setSearchParams({ page: String(page - 1) }),
    statusFilter,
    setStatusFilter: handleStatusFilter,
    dateRange,
    setDateRange: handleDateRange,
  }
}
