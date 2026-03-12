import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { GET_CHARGES_KPI } from '@/graphql/chargesKPI'
import type { ChargesKPI } from '@/types/kpis'
import { subDays, subMonths, subYears, startOfDay, endOfDay } from 'date-fns'

export type DateRangeOption = 'today' | 'week' | 'month' | 'quarter' | 'year' | 'all'

const DATE_RANGE_OPTIONS: Record<DateRangeOption, { label: string; from: () => Date }> = {
  today: { label: 'Hoy', from: () => startOfDay(new Date()) },
  week: { label: 'Última semana', from: () => subDays(new Date(), 7) },
  month: { label: 'Último mes', from: () => subMonths(new Date(), 1) },
  quarter: { label: 'Últimos 3 meses', from: () => subMonths(new Date(), 3) },
  year: { label: 'Último año', from: () => subYears(new Date(), 1) },
  all: { label: 'Siempre', from: () => new Date(2020, 0, 1) },
}

export { DATE_RANGE_OPTIONS }

interface KPIData {
  chargesDateRangeKPI: ChargesKPI
}

interface KPIVariables {
  start?: number
  end?: number
  timezone?: string
}

export function useChargesKPI() {
  const [selectedRange, setSelectedRange] = useState<DateRangeOption>('all')

  const from = DATE_RANGE_OPTIONS[selectedRange].from()
  const to = new Date()

  const { data, loading, error } = useQuery<KPIData, KPIVariables>(GET_CHARGES_KPI, {
    variables: {
      start: Math.floor(startOfDay(from).getTime() / 1000),
      end: Math.floor(endOfDay(to).getTime() / 1000),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  })

  return {
    kpi: data?.chargesDateRangeKPI ?? null,
    loading,
    error,
    selectedRange,
    setSelectedRange,
  }
}
