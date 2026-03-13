import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { GET_CHARGES_KPI } from '@/graphql/chargesKPI'
import type { KPIVariables, KPIData } from '@/types/kpis'
import { subDays, subMonths, subYears, startOfDay, endOfDay } from 'date-fns'
import { t } from '@/lib/i18n'

export type DateRangeOption = 'today' | 'week' | 'month' | 'quarter' | 'year' | 'all'

export const DATE_RANGE_OPTIONS: Record<DateRangeOption, { label: string; from: () => Date }> = {
  today: { label: t.dateRangeOptions.today, from: () => startOfDay(new Date()) },
  week: { label: t.dateRangeOptions.week, from: () => subDays(new Date(), 7) },
  month: { label: t.dateRangeOptions.month, from: () => subMonths(new Date(), 1) },
  quarter: { label: t.dateRangeOptions.quarter, from: () => subMonths(new Date(), 3) },
  year: { label: t.dateRangeOptions.year, from: () => subYears(new Date(), 1) },
  all: { label: t.dateRangeOptions.all, from: () => new Date(2020, 0, 1) },
}

const INTERVAL_BY_RANGE: Record<DateRangeOption, string> = {
  today: 'hour',
  week: 'day',
  month: 'day',
  quarter: 'week',
  year: 'month',
  all: 'month',
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
      interval: INTERVAL_BY_RANGE[selectedRange],
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
