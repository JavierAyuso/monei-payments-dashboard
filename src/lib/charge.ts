import type { ChargeStatus } from '@/types/charge'

export const statusColor: Record<ChargeStatus, string> = {
  SUCCEEDED: '#22c55e',
  FAILED: '#ef4444',
  CANCELED: '#94a3b8',
  EXPIRED: '#eab308',
  REFUNDED: '#3b82f6',
  PARTIALLY_REFUNDED: '#3b82f6',
  AUTHORIZED: '#a855f7',
  PENDING: '#f97316',
}

export const statusClass: Record<ChargeStatus, string> = {
  SUCCEEDED: 'bg-green-500/20 text-green-600 dark:text-green-400',
  FAILED: 'bg-red-500/20 text-red-600 dark:text-red-400',
  CANCELED: 'bg-gray-500/20 text-gray-600 dark:text-gray-400',
  EXPIRED: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
  REFUNDED: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
  PARTIALLY_REFUNDED: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
  AUTHORIZED: 'bg-purple-500/20 text-purple-600 dark:text-purple-400',
  PENDING: 'bg-orange-500/20 text-orange-600 dark:text-orange-400',
}

export const statusLabel: Record<ChargeStatus, string> = {
  SUCCEEDED: 'Completado',
  FAILED: 'Fallido',
  CANCELED: 'Cancelado',
  EXPIRED: 'Expirado',
  REFUNDED: 'Reembolsado',
  PARTIALLY_REFUNDED: 'Reembolso parcial',
  AUTHORIZED: 'Autorizado',
  PENDING: 'Pendiente',
}
